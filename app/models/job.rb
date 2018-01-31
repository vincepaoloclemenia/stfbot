class Job < ApplicationRecord
    extend FriendlyId
    belongs_to :company
    belongs_to :creator, -> { where(role: 'employer') }, class_name: 'User', foreign_key: :user_id
    has_many :unread_applications, -> { where(qualified: true, read: false) }, class_name: 'JobApplication'
    has_many :unread_qualified_applications, -> { where(qualified: true, seen: false) }, class_name: 'JobApplication', dependent: :destroy
    has_many :read_qualified_applications, -> { where(qualified: true, seen: true) }, class_name: 'JobApplication', dependent: :destroy
    has_many :unqualified_applications, -> { where qualified: false }, class_name: 'JobApplication', dependent: :destroy  
    has_many :unread_qualified_applicants, class_name: 'User', through: :unread_qualified_applications, source: :user, dependent: :destroy
    has_many :read_qualified_applicants, class_name: 'User', through: :read_qualified_applications, source: :user, dependent: :destroy    
    has_many :unqualified_applicants, class_name: 'User', through: :unqualified_applications, source: :user, dependent: :destroy 
    has_many :candidates, dependent: :destroy
    has_many :suggested_candidates, class_name: 'User', through: :candidates, source: :user, dependent: :destroy
    friendly_id :title, use: [:slugged, :finders]
    has_many :unchecked_viewers, -> { where checked: false }, class_name: 'Viewer'
    has_many :viewers, dependent: :destroy
    has_many :interested_applicants, class_name: 'User', through: :viewers, source: :user
    default_scope -> { order(created_at: :desc) }
    validates_presence_of :title, :description, :location, :industry, :gender, :type_of_employee, :level_of_expertise, :education_attainment, :min_exp, :max_exp

end
