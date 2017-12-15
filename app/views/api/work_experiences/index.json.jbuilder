json.experiences do |work_exp|
    json.array! @experiences do |work_exp|
        json.id work_exp.id
        json.company_name work_exp.company_name
        json.job_title work_exp.job_title
        json.job_functions work_exp.job_functions
        json.job_description work_exp.job_description
        json.employment_from work_exp.employment_from.strftime('%B %Y')
        json.employment_to work_exp.employment_status ? 'Current' : work_exp.employment_to.strftime('%B %Y') 
        json.job_level work_exp.job_level
        json.employment_status work_exp.employment_status
    end
end