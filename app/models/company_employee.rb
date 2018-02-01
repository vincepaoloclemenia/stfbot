class CompanyEmployee < ApplicationRecord
    belongs_to :user
    belongs_to :company

    scope :employees, -> { where.not role: 'company_admin' }
    
    after_destroy { |c| User.all.where.not(role: 'applicant').where(id: c.user_id).destroy_all }
end
