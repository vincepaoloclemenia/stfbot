class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  has_one :employer, class_name: 'CompanyEmployee'
  has_one :company, through: :employer
  has_many :educations, dependent: :destroy
  has_many :skills, dependent: :destroy
  has_many :work_experiences, dependent: :destroy
  has_one :address, dependent: :destroy
  
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

  before_save :capitalize_names 
  validate :validate_role

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
      roles = ['applicant', 'employer', 'company_admin']
      if roles.exclude?(self.role)
        errors.add(:role, :invalid)
      end
    end
  end

end
