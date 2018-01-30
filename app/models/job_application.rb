class JobApplication < ApplicationRecord
    belongs_to :job
    belongs_to :user, -> { where role: 'applicant' }

    scope :unread, -> { where(seen: false) }
end
