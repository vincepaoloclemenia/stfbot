module SaveJobs
    extend ActiveSupport::Concern
    included do
        has_many :saved_jobs, dependent: :destroy
        has_many :prospects, class_name: 'Job', through: :saved_jobs, source: :job, dependent: :destroy
    end

    def save_job(job)
        return false if self.role == 'company_admin'
        saved_jobs.create(job_id: job.id)
    end

    def unsave_job(job)
        saved_jobs.find_by(job_id: job.id).destroy
    end

    def saved?(job)
        saved_jobs.where(job_id: job.id).exists?
    end

end