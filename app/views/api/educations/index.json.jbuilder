json.educations do |education|
    json.array! @educations do |education|
        json.id education.id
        json.school_name education.school_name
        json.education_attainment education.education_attainment
        json.attend_from education.attend_from.strftime('%B %Y')
        json.attend_to education.attend_to.strftime('%B %Y')
        json.graduate education.status
        json.course education.course
    end
end