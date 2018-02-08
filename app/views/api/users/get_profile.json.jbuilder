json.user do |json|
    json.id  @user.id
    json.first_name @user.first_name
    json.last_name @user.last_name
    json.full_name @user.full_name
    json.email @user.email
    json.avatar @user.avatar
    json.contact @user.contact
    json.country @user.address.present? ? @user.address.country : nil
    json.state @user.address.present? ? @user.address.state : nil
    json.city @user.address.present? ? @user.address.city : nil
    json.street @user.address.present? ? @user.address.street : nil
    json.birthdate @user.birthdate.present? ? @user.birthdate.strftime('%B %d %Y') : nil
    json.gender @user.gender
    json.resume @user.resume
    json.skills @user.skills do |s|
        json.name s.name
        json.literacy_level s.literacy_level
    end
    json.educations @user.educations do |education|
        json.id education.id
        json.school_name education.school_name
        json.education_attainment education.education_attainment
        json.attend_from education.attend_from.strftime('%B %Y')
        json.attend_to education.attend_to.strftime('%B %Y')
        json.graduate education.status
        json.course education.course
        json.accomplishments education.accomplishments
    end
    json.work_experiences @user.work_experiences do |work_exp|
        json.id work_exp.id
        json.company_name work_exp.company_name
        json.job_title work_exp.job_title
        json.job_functions work_exp.job_functions
        json.job_description work_exp.job_description
        json.employment_from work_exp.employment_from.strftime('%B %Y')
        json.employment_to work_exp.employment_status ? 'Current' : work_exp.employment_to.strftime('%B %Y') 
        json.job_level work_exp.job_level
        json.employment_status work_exp.employment_status
        json.achievements work_exp.achievements
    end
    json.currently_working @user.current_employment
    json.employed @user.employed?
    json.company @user.employer
end