json.industries do |json|
    json.array! @industries.each_with_index.to_a do |(ind, index)|
        json.label ind
        json.value index
    end
end

json.size do |json|
    json.array! @size.each_with_index.to_a do |(size, index)|
        json.label size
        json.value index
    end
end

json.information do |json|
    json.array! @information.each_with_index.to_a do |(info, index)|
        json.label info
        json.value index
    end
end