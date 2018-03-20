json.finance_admins do |json|
    json.array! @finance_admins do |fa|
        json.id fa.id
        json.first_name fa.first_name
        json.last_name fa.last_name
        json.avatar fa.avatar
        json.full_name fa.full_name
        json.email fa.email
        json.code_num fa.code_num
        json.contact fa.contact
        json.role fa.role.split.map(&:capitalize!).join(' ')
        json.shifting_schedule fa.shifting_schedule
    end
end