json.states do |json|
    json.array! @states.each_with_index.to_a do |(state, index)|
        json.label state
        json.value index
    end
end