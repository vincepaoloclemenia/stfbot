json.next_page @companies.next_page
json.companies do |json|
    json.array! @companies do |company|
        json.slug company.slug
        json.id company.id
        json.avatar company.avatar
        json.name company.name
        json.address company.address
        json.total_of_employees company.hired_employees.size
        json.contact company.telefax
        json.street company.location.present? ? company.location.street : ''
        json.city company.location.present? ? company.location.city : ''
        json.state company.location.present? ? company.location.state : ''
        json.country company.location.present? ? company.location.country : ''
        json.number_of_employees company.number_of_employees
        json.user_first_name company.employees.find_by_role('company_admin').first_name
        json.user_last_name company.employees.find_by_role('company_admin').last_name
        json.user_email company.employees.find_by_role('company_admin').email
        json.user_username company.employees.find_by_role('company_admin').username
        json.industry company.industry
    end
end