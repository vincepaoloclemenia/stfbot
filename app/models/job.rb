class Job < ApplicationRecord
    extend FriendlyId
    belongs_to :company
    belongs_to :creator, -> { where(role: 'employer') }, class_name: 'User', foreign_key: :user_id
    has_many :job_applications, dependent: :destroy
    has_many :applicants, class_name: 'User', through: :job_applications, source: :user, dependent: :destroy

    friendly_id :title, use: [:slugged, :finders]

    default_scope -> { order(created_at: :desc) }
    validates_presence_of :title, :description, :location, :industry, :gender, :type_of_employee, :level_of_expertise, :education_attainment, :min_exp, :max_exp
end
