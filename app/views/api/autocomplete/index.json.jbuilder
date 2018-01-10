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
        json.name job.name
        json.url company_path(job)
        json.avatar_url job.avatar
    end
end