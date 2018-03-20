json.employers do |json|
    json.array! @employers do |emp|
        json.id emp.id
        json.first_name emp.first_name
        json.last_name emp.last_name
        json.avatar emp.avatar
        json.full_name emp.full_name
        json.email emp.email
        json.contact emp.contact
        json.code_num emp.code_num
        json.role emp.role.capitalize!
    end
end