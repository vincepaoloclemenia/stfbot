json.contractors do |json|
    json.array! @contractors do |con|
        json.id con.id
        json.username con.username
        json.company con.company
        json.first_name con.first_name
        json.last_name con.last_name
        json.avatar con.avatar
        json.full_name con.full_name
        json.email con.email
        json.contact con.contact
        json.code_num con.code_num
        json.role con.role.split.map(&:capitalize!).join(' ')
        json.rate_per_hour con.rate_per_hour
        json.min_flexi_time con.min_flexi_time
        json.max_flexi_time con.max_flexi_time
        json.shifting_schedule con.shifting_schedule
        json.is_professional con.is_professional
    end
end