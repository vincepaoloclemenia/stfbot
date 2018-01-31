class JobApplication < ApplicationRecord
    belongs_to :job
    belongs_to :user, -> { where role: 'applicant' }
    default_scope -> { order created_at: :desc }
end
