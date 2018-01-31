class User < ApplicationRecord
  extend FriendlyId
  include ApplyJob
  include SaveJobs
  include ViewJob
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  has_one :employer, class_name: 'CompanyEmployee'
  has_one :company, through: :employer
  has_many :educations, dependent: :destroy
  has_many :skills, dependent: :destroy
  has_many :work_experiences, dependent: :destroy
  has_one :address, dependent: :destroy
  has_many :created_jobs, class_name: 'Job', source: :user_id, dependent: :destroy
  has_one :preference, dependent: :destroy
  has_many :suggested_jobs, dependent: :destroy
  has_many :preferred_jobs, class_name: 'Job', source: :user, dependent: :destroy

  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
          #:confirmable, :lockable, :timeoutable,
          #:authentication_keys => [:login], :timeout_in => 1.hours

  has_attached_file :avatar, :styles => {:medium => "300x300>", :thumb => "35x35>" }, :default_url => "/img/no-user-image.jpg"
  has_attached_file :resume
  validates_attachment :avatar,
                      :content_type => { :content_type => /^image\/(png|gif|jpeg|jpg)/, message: "must be in the format png|gif|jpg" },
                      :size => { :in => 0..1000.kilobytes, message: "must be less than 1MB" }
  
                      validates_attachment :resume, content_type: { content_type: /^application\/(pdf|doc|docx)/, message: "Only accepts pdf or doc files" }
  validates_presence_of :first_name, :last_name, :role
  validates :username, presence: true, uniqueness: { case_sensitive: false }, format: { with: /\A[a-zA-Z0-9_\.]*\z/ }
  friendly_id :username, use: [:slugged, :finders]
  validate :validate_role
  
  #scope :qualified_applicants, -> { where.not(role: 'company_admin').joins(:job_applications).where( 'job_applications.qualified = ?', true ) }
  
  before_save :capitalize_names 
  after_destroy { |user| CompanyEmployee.where(user_id: user.id).destroy_all }

  attr_accessor :login

  def full_name
    "#{first_name} #{last_name}"
  end

  def capitalize_names
    first_name.split.map(&:capitalize!).join(' ')
    last_name.split.map(&:capitalize!).join(' ')
  end

  def validate_role
    if new_record?
      roles = ['applicant', 'employer', 'company_admin', 'finance admin']
      if roles.exclude?(self.role)
        errors.add(:role, :invalid)
      end
    end
  end

  def employed?  
    !company.nil?
  end

  def current_employment
    experience = if !employed? && work_experiences.where(employment_status: true).exists?
      work_experiences.find_by(employment_status: true)
      else
        nil
    end
    experience
  end

end
