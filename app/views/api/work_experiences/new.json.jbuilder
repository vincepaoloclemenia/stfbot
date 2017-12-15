json.job_levels do |json|
    json.array! @job_levels.each_with_index.to_a do |(job, index)|
        json.label job
        json.value index
    end
end

json.job_functions do |json|
    json.array! @job_functions.each_with_index.to_a do |(job, index)|
        json.label job
        json.value index
    end
end

json.months do |json|
    json.array! @months.each_with_index.to_a do |(month, index)|
        json.label month
        json.value index
    end
end

json.years do |json|
    json.array! @years.each_with_index.to_a do |(year, index)|
        json.label year
        json.value index
    end
end