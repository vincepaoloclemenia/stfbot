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
        json.date case (Date.today - job.created_at.to_date).to_i
                    when 1 then "Yesterday at #{job.created_at.to_time.strftime('%l:%M %P')}"
                    else time_ago_in_words(job.created_at) + " ago"
                    end
        json.description job.description
        json.requirements job.requirements
        json.preferred_courses job.preferred_courses
        json.company do |c|
            c.name job.company.name
            c.avatar job.company.avatar
            c.overview job.company.overview
            c.why_join_us job.company.why_join_us
            c.benefits job.company.benefits
            c.website job.company.website
        end
        json.creator do |c|
            c.id job.creator.id
            c.email job.creator.email
            c.first_name job.creator.first_name
            c.last_name job.creator.last_name
            c.last_sign_in_at time_ago_in_words(job.creator.last_sign_in_at) + ' ago'
        end
        json.applicants_count job.unread_applications.size
        json.viewers_count job.unchecked_viewers.size
    end
end