json.employers do |json|
    json.array! @employers do |emp|
        json.id emp.id
        json.first_name emp.first_name
        json.last_name emp.last_name
        json.avatar emp.avatar
        json.full_name emp.full_name
        json.email emp.email
        json.contact emp.contact
        json.role emp.role.split.map(&:capitalize!).join(' ')
    end
end

json.finance_admins do |json|
    json.array! @finance_admins do |fa|
        json.id fa.id
        json.first_name fa.first_name
        json.last_name fa.last_name
        json.avatar fa.avatar
        json.full_name fa.full_name
        json.email fa.email
        json.contact fa.contact
        json.role fa.role.split.map(&:capitalize!).join(' ')
    end
end