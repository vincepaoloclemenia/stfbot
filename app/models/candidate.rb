class Candidate < ApplicationRecord
    belongs_to :job
    belongs_to :user, -> { where.not role: 'company_admin' }
end
