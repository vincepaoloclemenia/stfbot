json.universities do |json|
    json.array! @universities.each_with_index.to_a do |(univ, index)|
        json.label univ
        json.value index
    end
end

json.attainments do |json|
    json.array! @attainments.each_with_index.to_a do |(attainment, index)|
        json.label attainment
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

json.courses do |json|
    json.array! @courses.each_with_index.to_a do |(course, index)|
        json.label course
        json.value index
    end
end

