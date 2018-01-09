json.countries do |json|
    json.array! @countries.each_with_index.to_a do |(country, index)|
        json.label country
        json.value index
    end
end

json.industries do |json|
    json.array! @industries.each_with_index.to_a do |(industry, index)|
        json.label industry
        json.value index
    end
end

json.sizes do |json|
    json.array! @size.each_with_index.to_a do |(size, index)|
        json.label size
        json.value index
    end
end