class Company < ApplicationRecord
    extend FriendlyId
    include PgSearch
    has_many :employees, class_name: 'CompanyEmployee', dependent: :destroy
    has_many :users, through: :employees
    has_many :jobs, dependent: :destroy
    has_one :location, dependent: :destroy  

    pg_search_scope :search, against: [:name],
    using: {tsearch: {dictionary: "english"}}
    
    has_attached_file :avatar, styles: { medium: "300x300>", thumb: "35x35>" }, default_url: "/img/company-no-image-avatar.png"
    validates_attachment :avatar, content_type: { content_type: /^image\/(png|gif|jpeg|jpg)/, message: "must be in the format png|gif|jpg" }, size: { :in => 0..1000.kilobytes, message: "must be less than 1MB" }
    
    friendly_id :name, use: [:slugged, :finders]

    after_destroy :destroy_users

    before_save :regulate_admins
    
    def hire(applicant)
        employees.create(user_id: applicant.id, hiring_date: Date.today.to_date)
    end

    def terminate(current_employee)
        employees.find_by(user_id: current_employee.id).destroy
    end

    def an_employee?(applicant)
        users.pluck(:id).include?(applicant.id)
    end

    def company_profile
        progress = [
            users.where(role: 'employer').exists?,
            users.where(role: 'finance admin').exists?,
            avatar.url != '/img/company-no-image-avatar.png',
            overview.present?,
            why_join_us.present?
        ]
        total = 5
        percentage = progress.length
        progress.each do |p|
            total -= 1 unless p
        end
        return ((total.to_f / percentage.to_f) * 100).to_i
    end

    def regulate_admins
        if users.where(role: 'company_admin').size > 1 
            errors.add(:users, 'Oops! Company has reached the maximum number of admins: 2')
        end
    end

    def destroy_users
        self.users.all.where.not(role: 'applicant').destroy_all
    end

    def self.text_search(query)
        if query.present?
          search(query)
        else
          scoped
        end
    end

end
