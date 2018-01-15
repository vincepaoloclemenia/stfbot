json.attainments do |json|
    json.array! @attainments.each_with_index.to_a do |(att, index)|
        json.label att
        json.value index
    end
end

json.positions do |json|
    json.array! @positions.each_with_index.to_a do |(pos, index)|
        json.label pos
        json.value index
    end
end

json.types do |json|
    json.array! @types.each_with_index.to_a do |(type, index)|
        json.label type
        json.value index
    end
end

json.genders do |json|
    json.array! @genders.each_with_index.to_a do |(gender, index)|
        json.label gender
        json.value index
    end
end

json.location @location

json.industries do |json|
    json.array! @industries.each_with_index.to_a do |(ind, index)|
        json.label ind
        json.value index
    end
end