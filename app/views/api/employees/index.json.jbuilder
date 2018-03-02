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

json.years do |json|
    json.array! @years.each_with_index.to_a do |(year, index)|
        json.label year
        json.value index
    end
end

json.functions do |json|
    json.array! @functions.each_with_index.to_a do |(func, index)|
        json.label func
        json.value index
    end
end

json.job_levels do |json|
    json.array! @job_levels.each_with_index.to_a do |(jl, index)|
        json.label jl
        json.value index
    end
end