json.timelogs do |json|
    json.array! @timelogs do |timelog|
        json.id timelog.id
        json.date timelog.date.strftime("%a, %b %d, %Y")
        json.login timelog.login? ? timelog.login.strftime("%l:%M %p") : "--:--"
        json.logout timelog.logout? ? timelog.logout.strftime("%l:%M %p") : "--:--"
        json.break_out timelog.break_out? ? timelog.break_out.strftime("%l:%M %p") : "--:--"
        json.break_in timelog.break_in? ? timelog.break_in.strftime("%l:%M %p") : "--:--"
        json.total_break_hours timelog.total_break_hours
        json.overtime_in timelog.overtime_in? ? timelog.overtime_in.strftime("%l:%M %p") : "--:--"
        json.overtime_out timelog.overtime_out? ? timelog.overtime_out.strftime("%l:%M %p") : "--:--"
        json.overtime timelog.overtime
        json.total_hours timelog.total_hours
        json.total_pay to_peso(timelog.total_pay)
        json.gross_pay to_peso(timelog.gross_pay)
        json.overtime_pay to_peso(timelog.overtime_pay)
        json.what_day timelog.date.wday == 0 || timelog.date.wday == 6
    end
end

json.unvalidated_timelogs do |json|
    json.array! @unvalidated_timelogs do |timelog|
        json.id timelog.id
        json.date timelog.date.strftime("%a, %b %d, %Y")
        json.login timelog.login? ? timelog.login.strftime("%l:%M %p") : "--:--"
        json.logout timelog.logout? ? timelog.logout.strftime("%l:%M %p") : "--:--"
        json.overtime_in timelog.overtime_in? ? timelog.overtime_in.strftime("%l:%M %p") : "--:--"
        json.overtime_out timelog.overtime_out? ? timelog.overtime_out.strftime("%l:%M %p") : "--:--"
        json.total_overtime_hours timelog.total_overtime_hours.round(2)
        json.total_hours timelog.total_hours
        json.offset timelog.hours_to_offset.round(2)
        json.excess (timelog.total_overtime_hours - (8 - timelog.total_overtime_hours))
        json.adjustments timelog.user.is_professional? ? to_peso(timelog.adjustments - (timelog.adjustments * 0.08)) : to_peso(timelog.adjustments - (timelog.adjustments * 0.02))
        json.unpaid_overtime timelog.user.is_professional? ? to_peso(timelog.unpaid_overtime - (timelog.unpaid_overtime * 0.08)) : to_peso(timelog.unpaid_overtime - (timelog.unpaid_overtime * 0.02))
        json.total_adjustments to_peso(timelog.total_adjustments)
        json.what_day timelog.date.wday == 0 || timelog.date.wday == 6
    end
end

json.total_unpaid_overtime to_peso(@unvalidated_timelogs.map { |x| x.total_adjustments }.sum)
json.total_hours_rendered @timelogs.pluck(:total_hours).sum
json.total_pay_for_the_week to_peso(@timelogs.pluck(:total_pay).sum)