json.skills do |json|
    json.array! @skills do |skill|
        json.id skill.id
        json.name skill.name
        json.literacy_level skill.literacy_level
    end
end

json.last_skill @last_skill