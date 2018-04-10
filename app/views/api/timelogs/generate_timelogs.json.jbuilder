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
        json.total_overtime_hours timelog.total_overtime_hours
        json.unpaid_overtime to_peso(timelog.unpaid_overtime)
        json.what_day timelog.date.wday == 0 || timelog.date.wday == 6
    end
end

if @timelogs.present?
    json.total_hours_rendered @timelogs.pluck(:total_hours).sum
    json.total_pay_for_the_week to_peso(@timelogs.pluck(:total_pay).sum)
    json.from @timelogs.last.date.strftime("%b %d, %Y")
    json.to @timelogs.first.date.strftime("%b %d, %Y")
end