 json.applicants do |j|
    j.array! @applicants do |app|
        j.id  app.id
        j.first_name app.first_name
        j.last_name app.last_name
        j.full_name app.full_name
        j.email app.email
        j.avatar app.avatar
        j.contact app.contact
        j.country app.address.present? ? app.address.country : nil
        j.state app.address.present? ? app.address.state : nil
        j.city app.address.present? ? app.address.city : nil
        j.street app.address.present? ? app.address.street : nil
        j.birthdate app.birthdate.present? ? app.birthdate.strftime('%B %d %Y') : nil
        j.gender app.gender
        j.resume app.resume
        j.application app.job_applications.find_by(job_id: @job.id)
        j.applied_date time_ago_in_words(app.job_applications.find_by(job_id: @job.id).created_at) + " ago"
        j.work_experiences app.work_experiences do |a|
            j.id a.id
            j.company_name a.company_name
            j.job_title a.job_title
            j.employment_from a.employment_from.strftime('%B %Y')
            j.employment_to a.employment_to.nil? ? nil : a.employment_to.strftime('%B %Y')
            j.status a.employment_status
            j.job_level a.job_level
        end
        j.skills app.skills
        j.educations app.educations do |ed|
            j.id ed.id
            j.school_name ed.school_name
            j.education_attainment ed.education_attainment
            j.attend_from ed.attend_from.strftime("%B %Y")
            j.attend_to ed.attend_to.strftime("%B %Y")
            j.course ed.course
        end
        j.profile_url profile_path(slug: app.slug)
    end
end