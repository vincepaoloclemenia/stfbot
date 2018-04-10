class Timelog < ApplicationRecord
    belongs_to :user, -> { includes(:company).where( role: ['regular_employee', 'employer', 'contractor', 'finance admin'] ) }
    validates :date, presence: true, uniqueness: { scope: :user, message: "can only login once" }
    
    default_scope -> { order(date: :desc) }

    def break_hours
        hours = if break_in? && break_out? && !self.user.shifting_schedule
            ((break_in - break_out) / 60 / 60 ).round(2) <= 1 ? 1.0.to_d : ((break_in - break_out) / 60 / 60 ).round(2).to_d
        else
            0.0
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

    def all_ready?
        if date.wday == 0 || date.wday == 6
            overtime_in? && overtime_out?
        else
            login? && logout?
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
        time = self.user.shifting_schedule? ? 8 : 9
        if self.user.shifting_schedule?
            user_min_flex_timein + time.hours
        else
            "#{date} #{self.user.max_flexi_time}".to_time + time.hours
        end
    end

    def user_min_flex_timeout
        time = self.user.shifting_schedule? ? 8 : 9
        if self.user.shifting_schedule?
            user_min_flex_timein + time.hours
        else
            "#{date} #{self.user.min_flexi_time}".to_time + time.hours
        end
    end

    def late?
        return false if login.nil? || date.wday == 0 || date.wday == 6
        login > user_max_flex_timein
    end

    def undertime? 
        return false if date.wday == 6 || date.wday == 0
        logout < user_min_flex_timeout
    end

    def valid_overtime?
        valid_ot == 'VALID' || valid_ot == 'valid'
    end

    def late_out?
        return false if logout.nil? || date.wday == 0 || date.wday == 6
        logout > user_max_flex_timeout 
    end

    def early_time_in?
        return false if login.nil? || date.wday == 0 || date.wday == 6
        login < user_min_flex_timein
    end

    def night_differential_hours
        if date.wday == 0 || date.wday == 6
            if overtime_out?
                overtime_out > "#{date} 10:00 PM".to_time ? ((overtime_out - "#{date} 10:00 PM".to_time) / 60 / 60).to_d : 0.0
            elsif shift == '3RD SHIFT'
                overtime_out > "#{date} 10:00 PM".to_time ? ((overtime_out - overtime_in)/60/60).to_d : 0.0
            else
                0.0
            end
        else
            if logout?
                logout > "#{date} 10:00 PM".to_time ? ((logout - "#{date} 10:00 PM".to_time) / 60 / 60).to_d : 0.0
            elsif shift == '3RD SHIFT'
                login > "#{date} 10:00 PM".to_time ? ((logout - login)/60/60).to_d : 0.0
            else
                0.0
            end
        end
    end

    def weekend?
        date.wday == 0 || date.wday == 6
    end

    def total_rendered_hours
        hours = if date.wday == 0 || date.wday == 6
                    0.0
                else
                    if login? && logout?                
                        if late?
                            ((user_max_flex_timeout - login ) / 60 / 60 - break_hours).to_d
                        elsif late? && undertime?
                            ((logout - login) /60 /60 - break_hours).to_d
                        elsif early_time_in?  
                            if late_out? 
                                8.to_d
                            elsif undertime?
                                ((logout - user_min_flex_timein)/60/60 - break_hours).to_d
                            end
                        else
                            8.to_d
                        end              
                    else
                        0.0
                    end
                end
        hours.to_d
    end

    def total_overtime_hours
        hours = if date.wday == 0 || date.wday == 6
                    deduction = is_holiday? ? 1 : 0.5
                    if overtime_out? && overtime_in?
                        ((overtime_out - overtime_in) / 60 / 60 - deduction).to_d
                    else
                        0.0
                    end
                else    
                    if login? && logout?
                        if late?
                            if late_out?
                                ((logout - user_max_flex_timeout)/60/60).to_d - ((login - user_max_flex_timein)/60/60).to_d
                            else
                                0.0
                            end
                        elsif early_time_in?
                            if late_out?
                                ((logout - login)/60/60 - break_hours).to_d - 8
                            else
                                ((user_min_flex_timein - login)/60/60).to_d
                            end
                        else
                           ((logout - login)/60/60 - break_hours).to_d - 8
                        end
                    else
                        0
                    end
                end
        hours.to_d
    end

    def has_overtime?
        total_overtime_hours >= 1
    end

    def self.unvalidated_overtime
        timelogs = []
        where(valid_ot: nil).map do |timelog|
            timelogs << timelog if timelog.has_overtime? && timelog.unpaid_overtime > 0.0
        end
        timelogs
    end

    def below_eight_hours?
        total_rendered_hours < 8
    end

    def hours_to_offset
        if below_eight_hours?
            (8 - total_rendered_hours).to_d
        else
            0.0
        end
    end

    def adjustments
        holiday_percentage = is_holiday? ? 2 : 1
        if has_overtime?
            if date.wday == 0 || date.wday == 6   
                0.0
            elsif below_eight_hours? && has_overtime?
                offset = total_overtime_hours > hours_to_offset ? hours_to_offset : total_overtime_hours  
                (offset * self.user.rate_per_hour * holiday_percentage).to_d
            else
                0.0
            end
        else
            0.0    
        end
    end

    def unpaid_overtime
        holiday_percentage = is_holiday? ? 2 : 1
        if has_overtime?
            if date.wday == 0 || date.wday == 6   
                percentage = is_holiday? ? 2 : 1.5  
                (total_overtime_hours * self.user.rate_per_hour * percentage).to_d
            else
                if below_eight_hours?
                    percentage = is_holiday? ? 2 : 1.3  
                    offset = total_overtime_hours > hours_to_offset ? (total_overtime_hours - hours_to_offset).to_d : 0.0
                    (offset * self.user.rate_per_hour * percentage).to_d
                else
                    (total_overtime_hours * self.user.rate_per_hour * holiday_percentage).to_d
                end
            end
        else
            0.0
        end
    end

    def total_adjustments
        adjustments + unpaid_overtime
    end

    def compute_total_pay
        professional_fee = self.user.is_professional? ? 0.08 : 0.02
        holiday_percentage = is_holiday? ? 2 : 1
        if date.wday == 0 || date.wday == 6 #weekends
            night_differential_fee = (self.user.rate_per_hour * night_differential_hours * 0.1)
            percentage = is_holiday? ? 2 : 1.5
            ot_pay = (total_overtime_hours * self.user.rate_per_hour * percentage + night_differential_fee).to_d
            tax_due = (ot_pay * professional_fee).to_d
            total_payment = ot_pay - tax_due
            self.update(overtime_pay: ot_pay, total_break_hours: break_hours, gross_pay: ot_pay, total_hours: total_overtime_hours, overtime: total_overtime_hours, total_pay: total_payment)
        else #weekdays
            night_differential_fee = (self.user.rate_per_hour * night_differential_hours * 0.1)
            if valid_overtime?
                percentage = is_holiday? ? 2 : 1.3
                if late?
                    offset = total_rendered_hours <= 8 ? 8 - total_rendered_hours : 0.0
                    overtime_hrs = (total_overtime_hours - offset) < 1 ? 0.0 : (total_overtime_hours - offset).to_d
                    total_hrs = (total_rendered_hours - offset) < 8 ? (total_rendered_hours - offset).to_d : 8.to_d
                    overtime_payment = (overtime_hrs * self.user.rate_per_hour * percentage).to_d
                    gross_payment = ((total_hrs * self.user.rate_per_hour * holiday_percentage) + overtime_payment + night_differential_fee).to_d
                    total_payment = (gross_payment - (gross_payment * professional_fee)).to_d
                    self.update(overtime_pay: overtime_payment, total_break_hours: break_hours, gross_pay: gross_payment, total_hours: total_hrs, overtime: overtime_hrs, total_pay: total_payment)                    
                elsif early_time_in?
                    if undertime?
                        offset = total_rendered_hours <= 8 ? 8 - total_rendered_hours : 0.0
                        overtime_hrs = (total_overtime_hours - offset) < 1 ? 0.0 : (total_overtime_hours - offset).to_d
                        total_hrs = (total_rendered_hours - offset) < 8 ? (total_rendered_hours - offset).to_d : 8.to_d
                        overtime_payment = (overtime_hrs * self.user.rate_per_hour * percentage).to_d
                        gross_payment = ((total_hrs * self.user.rate_per_hour * holiday_percentage) + overtime_payment + night_differential_fee).to_d
                        total_payment = (gross_payment - (gross_payment * professional_fee)).to_d
                        self.update(overtime_pay: overtime_payment, total_break_hours: break_hours, gross_pay: gross_payment, total_hours: total_hrs, overtime: overtime_hrs, total_pay: total_payment)
                    elsif late_out?
                        overtime_payment = total_overtime_hours < 1 ? 0.00 : (total_overtime_hours * self.user.rate_per_hour * percentage).to_d
                        gross_payment = ((total_rendered_hours * self.user * holiday_percentage) + overtime_payment + night_differential_fee).to_d
                        total_payment = (gross_payment - (gross_payment * professional_fee)).to_d
                        self.update(overtime_pay: overtime_payment, total_break_hours: break_hours, gross_pay: gross_payment, total_hours: total_rendered_hours, overtime: total_overtime_hours, total_pay: total_payment)                        
                    end
                end
            else
                gross_payment = (total_rendered_hours * self.user.rate_per_hour * holiday_percentage + night_differential_fee).to_d
                total_payment = (gross_payment - (gross_payment * professional_fee)).to_d
                self.update(overtime_pay: 0.00.to_d, total_break_hours: break_hours, gross_pay: gross_payment, total_hours: total_rendered_hours.to_d, overtime: 0.0, total_pay: total_payment)                                                                            
            end
        end
    end
    
end

