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
    end
end

json.unvalidated_timelogs do |json|
    json.array! @unvalidated_timelogs do |timelog|
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
    end
end