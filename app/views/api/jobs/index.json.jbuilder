json.jobs do |json|
    json.array! @jobs do |job|
        json.id job.id
        json.title job.title
        json.location job.location
        json.industry job.industry
        json.gender job.gender
        json.type_of_employee job.type_of_employee
        json.level_of_expertise job.level_of_expertise
        json.requisition_number job.requisition_number
        json.education_attainment job.education_attainment
        json.min_exp job.min_exp
        json.max_exp job.max_exp
        json.date job.created_at.strftime('%b %d, %Y')
        json.creator do |c|
            c.id job.creator.id
            c.email job.creator.email
            c.first_name job.creator.first_name
            c.last_name job.creator.last_name
        end
    end
end