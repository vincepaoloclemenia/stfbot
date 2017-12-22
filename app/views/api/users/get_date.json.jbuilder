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

json.days do |json|
    json.array! @days.each_with_index.to_a do |(day, index)|
        json.label day
        json.value index
    end
end

json.genders do |json|
    json.array! @genders.each_with_index.to_a do |(gender, index)|
        json.label gender
        json.value index
    end
end