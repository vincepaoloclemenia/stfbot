json.countries do |json|
    json.array! @countries.each_with_index.to_a do |(country, index)|
        json.label country
        json.value index
    end
end