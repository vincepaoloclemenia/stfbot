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
  has_many :timelogs, dependent: :destroy

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

  def age
    age = if Date.today.month < birthdate.month 
      ( Date.today.year - birthdate.year - 1).to_i
    elsif Date.today.month == birthdate.month 
      if Date.today.day < birthdate.day
        ( Date.today.year - birthdate.year - 1).to_i
      else
        ( Date.today.year - birthdate.year)
      end
    else
      ( Date.today.year - birthdate.year).to_i
    end
    return age
  end

  def validate_role
    if new_record?
      roles = ['applicant', 'employer', 'company_admin', 'finance admin', 'regular_employee', 'contractor']
      if roles.exclude?(self.role)
        errors.add(:role, :invalid)
      end
    end
  end

  def employed?  
    !company.nil?
  end

  def employed_in_resume?
    work_experiences.where(employment_status: true).exists?
  end

  def current_employment
    experience = if !employed? && employed_in_resume?
      work_experiences.find_by(employment_status: true)
      else
        nil
    end
    experience
  end

  def create_work_experience(employment_date, position_level, job_function)
    if work_experiences.find_by_employment_status(true).present?
      work = work_experiences.find_by_employment_status(true)
      work.update(employment_status: false)
      job_title = role.eql?('employer') ? 'Technical Recruiter' : 'Finance Admin'
      work_experiences.create(
        job_title: job_title,
        company_name: self.company.name,
        employment_from: employment_date,
        employment_status: true,
        job_functions: job_function,
        job_level: position_level
      )
    else
      job_title = role.eql?('employer') ? 'Technical Recruiter' : 'Finance Admin'
      work_experiences.create(
        job_title: job_title,
        company_name: self.company.name,
        employment_from: employment_date,
        employment_status: true,
        job_functions: job_function,
        job_level: position_level
      )
    end
  end

  def employment_thru_stfbot?
    work = if employed?
      work_experiences.find_by(employment_status: true)
    else
      nil
    end
    work
  end
  
  def past_employments
    work_experiences.where(employment_status: false)
  end

  def todays_log
    timelogs.find_by_date(Date.today)
  end

  def logged_in?
    todays_log.present?
  end

  def logged_out?
    todays_log.logout.present?   
  end

  def taken_break?
    todays_log.break.present?
  end

  def end_of_break?
    todays_log.returned.present?
  end

end
