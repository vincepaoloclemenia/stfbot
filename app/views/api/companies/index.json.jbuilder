json.next_page @companies.next_page
json.companies do |json|
    json.array! @companies do |company|
        json.id company.id
        json.avatar company.avatar
        json.name company.name
        json.address company.address
        json.total_of_employees company.users.size
        json.contact company.telefax
    end
end