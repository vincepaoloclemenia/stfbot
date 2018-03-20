class Timelog < ApplicationRecord
    belongs_to :user, -> { includes(:company).where( role: ['regular_employee', 'employer', 'contractor', 'finance admin'] ) }
    validates :date, presence: true, uniqueness: { scope: :user, message: "can only login once" }
    #before_update :validate_entries
    default_scope -> { order(date: :asc) }

    def missing_entry
        if logout.present? && login.nil?
            errors.add("Login", " is missing for Name: #{self.user.full_name}, Date: #{date.strftime('%B %d, %Y')}")
        elsif break_in.present? && break_out.nil?
            errors.add("Break Out", " is missing for Name: #{self.user.full_name}, Date: #{date.strftime('%B %d, %Y')}")
        elsif overtime_out.present? && overtime_in.nil?
            errors.add("Overtime Out", " is missing for Name: #{self.user.full_name}, Date: #{date.strftime('%B %d, %Y')}")
        end
    end

    def validate_entries
        if date.wday > 5
            if overtime_out.nil? && overtime_in.present?
                errors.add("overtime out", " is missing")
            elsif login.present? || logout.present? || break_in.present? || break_out.present?
                errors.add("overtime", " wrong entry")
            end
        else
            if logout.nil? && login.present?
                errors.add("logout entry", " is missing")
            elsif break_out.nil? && break_in.present?
                errors.add("break out entry", " is missing")
            end
        end
    end

    def break_hours
        hours = if break_in? && break_out?
            ((break_in - break_out) / 60 / 60 ).round(2)
        else
            0
        end
        hours
    end

    def user_max_flex_timein
        "#{date} #{self.user.max_flexi_time}".to_time
    end

    def user_min_flex_timein
        "#{date} #{self.user.min_flexi_time}".to_time
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
        if late?
            (user_max_flex_timeout - login - break_hours) < 8
        else
            hours_per_day < 8
        end
    end

    def compute_total_hours
        if date.wday == 0 || date.wday == 6
            if overtime_in? && overtime_out?
                night_differential = overtime_in > "#{date} 10:00 PM".to_time ? 0.1 : 0
                percentage = is_holiday? ? 2 : 1.5
                deduction = is_holiday? ? 1 : 0.5
                total_hrs = ((overtime_out - overtime_in) / 60 / 60 ).round(2) - deduction
                total_payment = (total_hrs * self.user.rate_per_hour * percentage) + (total_hrs * self.user.rate_per_hour * night_differential)
                self.update(total_pay: total_payment.round(2), overtime: total_hrs, total_break_hours: break_hours, total_hours: total_hrs)
            end
        else
            if login? && logout?
                night_differential = login >= "#{date} 10:00 PM".to_time ? 0.1 : 0
                ot_percentage = is_holiday? ? 2 : 1.3 
                if valid_ot?
                    if late?
                        total_hrs = ((user_max_flex_timeout - login - break_hours)/60/60).round(2)
                        excess = ((logout - user_max_flex_timeout)/60/60).round(2)
                        valid_ot_hrs = excess - ( 8 - total_hrs )
                        hours_to_be_paid = (total_hours + excess) >= 8 ? 8 : total_hours + excess
                        ot = hours_to_be_paid <= 8 ? 0 : valid_ot_hrs >= 1 ? valid_ot_hrs : 0
                        total_payment = (hours_to_be_paid * self.user.rate_per_hour) + (ot * ot_percentage) + (hours_to_be_paid * self.user.rate_per_hour * night_differential)
                        self.update(total_hours: hours_to_be_paid, overtime: ot, total_break_hours: break_hours, total_pay: total_payment.round(2))
                    else
                        total_hrs = ((logout - login - break_hours)/60/60).round(2)
                        overtime_hours = (total_hrs - 8) >= 1 ? total_hrs - 8 : 0
                        hours_to_be_paid = total_hours >= 8 ? 8 : total_hours
                        total_payment = (hours_to_be_paid * self.user.rate_per_hour) + (overtime * self.user.rate_per_hour * ot_percentage) * (hours_to_be_paid * self.user.rate_per_hour * night_differential)
                        self.update(total_hours: hours_to_be_paid, overtime: overtime_hours, total_break_hours: break_hours, total_pay: total_payment.round(2))                        
                    end                   
                else
                    if late?
                        total_hrs = ((user_max_flex_timeout - login - break_hours)/60/60).round(2)
                        total_payment = (total_hrs * self.user.rate_per_hour).round(2) + (total_hrs * self.user.rate_per_hour * night_differential)
                        self.update(total_hours: total_hrs, overtime: 0, total_break_hours: break_hours, total_pay: total_payment.round(2))                                                
                    else
                        total_hrs = ((logout - login - break_hours)/60/60).round(2)
                        total_payment = (total_hrs * self.user.rate_per_hour).round(2) + (total_hrs * self.user.rate_per_hour * night_differential)
                        self.update(total_hours: total_hrs, overtime: 0, total_break_hours: break_hours, total_pay: total_payment.round(2))                                                                        
                    end            
                end
            end
        end
    end
    
end

