json.suggestions do |json|
    json.array @suggestions do |user|
        json.id user.id
        json.email user.email
        json.first_name user.first_name
        json.last_name user.last_name
    end
end