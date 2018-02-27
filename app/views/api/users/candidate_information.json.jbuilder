json.work_experiences do |work_exp|
    json.array! @experiences do |work_exp|
        json.id work_exp.id
        json.company_name work_exp.company_name
        json.job_title work_exp.job_title
        json.job_functions work_exp.job_functions
        json.job_description work_exp.job_description
        json.employment_from work_exp.employment_from.strftime('%b %Y')
        json.employment_to work_exp.employment_status ? 'Current' : work_exp.employment_to.strftime('%b %Y') 
        json.job_level work_exp.job_level
        json.employment_status work_exp.employment_status
        json.achievements work_exp.achievements
    end
end

json.educations do |education|
    json.array! @educations do |education|
        json.id education.id
        json.school_name education.school_name
        json.education_attainment education.education_attainment
        json.attend_from education.attend_from.strftime('%b %Y')
        json.attend_to education.attend_to.strftime('%b %Y')
        json.graduate education.status
        json.course education.course
        json.accomplishments education.accomplishments
    end
end

json.skills do |json|
    json.array! @skills do |skill|
        json.id skill.id
        json.name skill.name
        json.literacy_level skill.literacy_level
    end
end

json.user do |json|
    json.id  current_user.id
    json.first_name current_user.first_name
    json.last_name current_user.last_name
    json.full_name current_user.full_name
    json.email current_user.email
    json.avatar current_user.avatar
    json.contact current_user.contact
    json.country current_user.address.present? ? current_user.address.country : nil
    json.state current_user.address.present? ? current_user.address.state : nil
    json.city current_user.address.present? ? current_user.address.city : nil
    json.street current_user.address.present? ? current_user.address.street : nil
    json.birthdate current_user.birthdate.present? ? current_user.birthdate.strftime('%B %d %Y') : nil
    json.gender current_user.gender
    json.resume current_user.resume
end

json.current_work @current_work

