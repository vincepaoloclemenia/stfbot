json.employers do |json|
    json.array! @employers do |emp|
        json.id emp.id
        json.first_name emp.first_name
        json.last_name emp.last_name
        json.avatar emp.avatar
        json.full_name emp.full_name
        json.email emp.email
        json.code_num emp.code_num
        json.contact emp.contact
        json.role emp.role.split.map(&:capitalize!).join(' ')
        json.shifting_schedule emp.shifting_schedule
        json.is_professional emp.is_professional
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
        json.code_num fa.code_num
        json.contact fa.contact
        json.role fa.role.split.map(&:capitalize!).join(' ')
        json.shifting_schedule fa.shifting_schedule
        json.is_professional fa.is_professional
    end
end

json.contractors do |json|
    json.array! @contractors do |con|
        json.id con.id
        json.first_name con.first_name
        json.last_name con.last_name
        json.avatar con.avatar
        json.full_name con.full_name
        json.email con.email
        json.code_num con.code_num
        json.contact con.contact
        json.role con.role.split.map(&:capitalize!).join(' ')
        json.rate_per_hour con.rate_per_hour
        json.min_flexi_time con.min_flexi_time
        json.max_flexi_time con.max_flexi_time
        json.shifting_schedule con.shifting_schedule
        json.is_professional con.is_professional
    end
end

json.years do |json|
    json.array! @years.each_with_index.to_a do |(year, index)|
        json.label year
        json.value index
    end
end

json.hours do |json|
    json.array! @hours.each_with_index.to_a do |(hour, index)|
        json.label hour
        json.value index
    end
end

json.minutes do |json|
    json.array! @minutes.each_with_index.to_a do |(minute, index)|
        json.label minute
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