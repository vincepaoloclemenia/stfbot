class Job < ApplicationRecord
    belongs_to :company
    belongs_to :creator, class_name: 'User', foreign_key: :user_id
    has_many :job_applications, dependent: :destroy
    has_many :applicants, class_name: 'User', through: :job_applications, source: :user, dependent: :destroy
end
