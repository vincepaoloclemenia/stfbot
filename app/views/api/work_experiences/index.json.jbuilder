json.experiences do |work_exp|
    json.array! @experiences do |work_exp|
        json.id work_exp.id
        json.company_name work_exp.company_name
        json.job_title work_exp.job_title
        json.job_description work_exp.job_description
        json.employment_from work_exp.employment_from.strftime('%B %Y')
        json.employment_to work_exp.empoyment_to.strftime('%B %Y')
        json.job_level work_exp.job_level
    end
end