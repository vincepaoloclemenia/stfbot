json.inquiries do |json|
    json.array! @inquiries do |inq|
        json.id inq.id
        json.first_name inq.first_name
        json.last_name inq.last_name
        json.address inq.address
        json.contact inq.contact
        json.company_name inq.company_name
        json.company_size inq.company_size
        json.industry inq.industry
        json.info_from inq.info_from
        json.position inq.position
        json.email inq.email
    end
end