module ViewJob
    extend ActiveSupport::Concern

    included do
        has_many :viewers, dependent: :destroy
        has_many :viewed_jobs, class_name: 'Job', through: :viewers, source: :job, dependent: :destroy
    end

    def view(job)
        return false if viewed_job_ids.include?(job.id) || role != 'applicant'
        viewers.create(job_id: job.id)
    end

    def has_viewed?(job)
        viewed_job_ids.include?(job.id)
    end

end