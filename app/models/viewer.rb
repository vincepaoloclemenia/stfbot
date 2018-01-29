class Viewer < ApplicationRecord
    belongs_to :user, -> { where.not role: 'company_admin' }
    belongs_to :job
end
