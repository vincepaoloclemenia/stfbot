json.functions do |json|
    json.array! @functions.each_with_index.to_a do |(ind, index)|
        json.label ind
        json.value index
    end
end

json.levels do |json|
    json.array! @levels.each_with_index.to_a do |(lvl, index)|
        json.label lvl
        json.value index
    end
end

json.titles do |json|
    json.array! @titles.each_with_index.to_a do |(title, index)|
        json.label title
        json.value index
    end
end

json.positions do |json|
    json.array! @positions.each_with_index.to_a do |(type, index)|
        json.label type
        json.value index
    end
end

json.shifts do |json|
    json.array! @shifts.each_with_index.to_a do |(sh, index)|
        json.label sh
        json.value index
    end
end

json.countries do |json|
    json.array! @countries.each_with_index.to_a do |(country, index)|
        json.label country
        json.value index
    end
end

json.currencies do |json|
    json.array! @currencies.each_with_index.to_a do |(curr, index)|
        json.label curr
        json.value index
    end
end