class Timelog < ApplicationRecord
    belongs_to :user, -> { includes(:company).where( role: ['regular_employee', 'employer', 'contractor', 'finance admin'] ) }
    validates :date, presence: true, uniqueness: { scope: :user, message: "can only login once" }
    
    default_scope -> { order(date: :desc) }

    def break_hours
        hours = if break_in? && break_out? && !self.user.shifting_schedule
            ((break_in - break_out) / 60 / 60 ).round(2) <= 1 ? 1 : ((break_in - break_out) / 60 / 60 ).round(2)
        else
            0
        end
        hours.to_d
    end

    def user_max_flex_timein
        if self.user.shifting_schedule?
            case shift
                when '1ST SHIFT' then "#{date} 7:30 AM".to_time
                when '2ND SHIFT' then "#{date} 3:30 PM".to_time
                when '3RD SHIFT' then "#{date} 11:30 PM".to_time
            end
        else
            "#{date} #{self.user.max_flexi_time}".to_time
        end
    end

    def user_min_flex_timein
        if self.user.shifting_schedule?
            case shift
                when '1ST SHIFT' then "#{date} 7:30 AM".to_time
                when '2ND SHIFT' then "#{date} 3:30 PM".to_time
                when '3RD SHIFT' then "#{date} 11:30 PM".to_time
            end
        else
            "#{date} #{self.user.min_flexi_time}".to_time
        end
    end

    def user_max_flex_timeout
        "#{date} #{self.user.max_flexi_time}".to_time + 8.hours
    end

    def user_min_flex_timeout
        "#{date} #{self.user.min_flexi_time}".to_time + 8.hours
    end

    def late?
        login > user_max_flex_timein
    end

    def undertime? 
        logout < user_min_flex_timeout
    end

    def valid_overtime?
        valid_ot == 'VALID' || valid_ot == 'valid'
    end

    def early_time_in?
        login < user_min_flex_timein
    end

    def total_rendered_hours
        hours = if date.wday == 0 || date.wday == 6
                    0
                else
                    if login? &&  logout?                
                        if late?
                            (user_max_flex_timeout - login ) / 60 / 60 - break_hours
                        elsif late? && undertime?
                            ((logout - login) /60 /60) - break_hours
                        elsif early_time_in?  
                            undertime? ? ((logout - user_max_flex_timein)/60/60) - break_hours : (logout - login) /60 /60 - break_hours
                        else
                            (logout - login) / 60 / 60 - break_hours <= 8 ? (logout - login) / 60 / 60 : 8
                        end              
                    else
                        0
                    end
                end
        hours.to_d
    end

    def total_overtime_hours
        hours = if date.wday == 0 || date.wday == 6
                    deduction = is_holiday? ? 1 : 0.5
                    if overtime_out? && overtime_in?
                        (overtime_out - overtime_in) / 60 / 60 - deduction
                    else
                        0
                    end
                else    
                    if login? && logout?
                        if late?
                            if (((user_max_flex_timeout - login) / 60 / 60)  - break_hours ) < 8 || undertime?
                                0
                            else
                                hours_to_complete = 8 - ((user_max_flex_timeout - login ) / 60 / 60) - break_hours
                                overtime = (logout - user_max_flex_timeout) / 60 / 60
                                hours_to_complete > overtime ? hours_to_complete - overtime : 0
                            end
                        elsif early_time_in?
                            if undertime? 
                                rendered_hours = (((logout - login)/60/60) - break_hours) < 8 ? 0 : 8 - ((logout - login)/60/60) - break_hours
                                rendered_hours >= 1 ? rendered_hours : 0
                            else
                                (((login - logout)/60/60 - break_hours) - 8) >= 1 ? (login - logout)/60/60 - break_hours : 0  
                            end
                        elsif late? && undertime?
                            0
                        else
                            if ((logout - login ) / 60 / 60 ) - break_hours <= 8 || (((logout - login ) / 60 / 60 ) - break_hours - 8 ) < 1
                                0
                            else
                                ((logout - login ) / 60 / 60 ) - break_hours - 8 
                            end
                        end
                    else
                        0
                    end
                end
        hours.to_d
    end

    def compute_total_pay
        if date.wday == 0 || date.wday == 6
            percentage = is_holiday? ? 2 : 1.5
            ot_pay = total_overtime_hours * self.user.rate_per_hour * percentage
            self.update(overtime_pay: ot_pay.to_d, total_break_hours: break_hours.to_d, total_hours: total_rendered_hours.to_d, overtime: total_overtime_hours.to_d, total_pay: ot_pay.to_d)
        else #weekdays
            if valid_overtime?
                percentage = is_holiday? ? 2 : 1.3
                if late?
                    ot_hours = if total_rendered_hours + total_overtime_hours <= 8 
                                    0
                                else
                                    hours_needed = 8 - total_rendered_hours
                                    total_overtime_hours - hours_needed < 1 ? 0 : total_overtime_hours - hours_needed
                                end
                    ot_pay = self.user.rate_per_hour * ot_hours * percentage
                    total_hour_payment = ot_hours.zero? || total_rendered_hours < 8 ? ( total_rendered_hours * self.user.rate_per_hour ) : 8 * self.user.rate_per_hour
                    total_payment = total_hour_payment + ot_pay
                    self.update(overtime_pay: ot_pay.to_d, total_break_hours: break_hours.to_d, total_hours: total_rendered_hours.to_d, overtime: ot_hours.to_d, total_pay: total_payment.to_d)                    
                elsif undertime? && early_time_in?
                    ot_hours = if total_rendered_hours + total_overtime_hours < 8 
                                    0
                                else
                                    hours_needed = 8 - total_rendered_hours
                                    total_overtime_hours - hours_needed < 1 ? 0 : total_overtime_hours - hours_needed
                                end  
                    ot_pay = self.user.rate_per_hour * ot_hours * percentage
                    total_hour_payment = ot_hours.zero? || total_rendered_hours < 8 ? total_rendered_hours * self.user.rate_per_hour : 8 * self.user.rate_per_hour         
                    total_payment = total_hour_payment + ot_pay
                    self.update(overtime_pay: ot_pay.to_d, total_break_hours: break_hours.to_d, total_hours: total_rendered_hours.to_d, overtime: ot_hours.to_d, total_pay: total_payment.to_d)                                        
                else
                    ot_pay = total_overtime_hours * self.user.rate_per_hour * percentage
                    total_hour_payment = total_rendered_hours * self.user.rate_per_hour
                    total_hour_payment = ot_pay + total_hour_payment
                    self.update(overtime_pay: ot_pay.to_d, total_break_hours: break_hours.to_d, total_hours: total_rendered_hours.to_d, overtime: total_overtime_hours.to_d, total_pay: total_payment.to_d)                                                            
                end
            else
                total_payment = total_rendered_hours * self.user.rate_per_hour
                self.update(overtime_pay: 0.00.to_d, total_break_hours: break_hours.to_d, total_hours: total_rendered_hours.to_d, overtime: 0.0.to_d, total_pay: total_payment.to_d)                                                                            
            end
        end
    end
    
end

