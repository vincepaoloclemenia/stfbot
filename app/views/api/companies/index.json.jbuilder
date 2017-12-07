json.next_page @companies.next_page
json.companies do |json|
    json.array! @companies do |company|
        json.id company.id
        json.name company.name
        json.address company.address
        json.total_of_employees company.total_of_employees
        json.contact company.telefax
    end
end