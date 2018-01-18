json.cities do |json|
    json.array! @cities.each_with_index.to_a do |(city, index)|
        json.label city
        json.value index
    end 
end