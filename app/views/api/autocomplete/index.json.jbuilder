json.companies do |json|
    json.array! @companies do |comp|
        json.id comp.id
        json.name comp.name
        json.url company_path(comp)
        json.avatar_url comp.avatar
    end
end

json.jobs do |json|
    json.array! @jobs do |job|
        json.id job.id
        json.title job.title
        json.url job_path(slug: job.company.slug, title: job.slug)
        json.avatar_url job.company.avatar
    end
end