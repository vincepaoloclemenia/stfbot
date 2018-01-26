json.job do |json|
    json.id @job.id
    json.title  @job.title
    json.description @job.description
    json.location @job.location
    json.industry @job.industry
    json.gender @job.gender
    json.created_at @job.created_at
    json.slug @job.slug
    json.user_id @job.creator.id
    json.education_attainment @job.education_attainment
    json.min_exp @job.min_exp
    json.max_exp @job.max_exp
    json.type_of_employee @job.type_of_employee
    json.level_of_expertise @job.level_of_expertise
    json.requisition_number @job.requisition_number
    json.preferred_courses @job.preferred_courses
    json.requirements @job.requirements
    json.company do |c|
        c.name @job.company.name
        c.avatar @job.company.avatar
        c.overview @job.company.overview
        c.why_join_us @job.company.why_join_us
        c.benefits @job.company.benefits
        c.website @job.company.website
    end
    json.creator do |c|
        c.id @job.creator.id
        c.email @job.creator.email
        c.first_name @job.creator.first_name
        c.last_name @job.creator.last_name
    end
end