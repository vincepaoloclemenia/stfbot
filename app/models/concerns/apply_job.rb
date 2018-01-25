module ApplyJob
    extend ActiveSupport::Concern

    included do
        has_many :job_applications, dependent: :destroy
        has_many :applied_jobs, class_name: 'Job', through: :job_applications, source: :job, dependent: :destroy
    end

    def apply(job)
        return false if self.role != 'applicant'
        job_applications.create(job_id: job.id)
    end

    def cancel_application(job)
        job_applications.find_by_job_id(job.id).destroy
    end

    def applied?(job)
        job_applications.where(job_id: job.id).exists?
    end

end