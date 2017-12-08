class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  has_one :employer, class_name: 'CompanyEmployee'
  has_one :company, through: :employer

  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
          #:confirmable, :lockable, :timeoutable,
          #:authentication_keys => [:login], :timeout_in => 1.hours

  validates_presence_of :first_name, :last_name, :role
  validates :username, presence: true, uniqueness: { case_sensitive: false }, format: { with: /\A[a-zA-Z0-9_\.]*\z/ }

  before_save :capitalize_names 
  validate :validate_role

  attr_accessor :login

  def full_name
    "#{first_name} #{last_name}"
  end

  def capitalize_names
    first_name.capitalize!
    last_name.capitalize!
  end

  def validate_role
    roles = ['applicant', 'employer', 'admin']
    if roles.exclude?(self.role)
      errors.add(:role, :invalid)
    end
  end

  def to_param
    username
  end

end
