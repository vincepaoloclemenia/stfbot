class Company < ApplicationRecord
    has_many :employees, class_name: 'CompanyEmployee', dependent: :destroy
    has_many :users, class_name: 'User', through: :employees, dependent: :destroy
    has_one :location, dependent: :destroy
    accepts_nested_attributes_for :users, allow_destroy: true

    has_attached_file :avatar, styles: { medium: "300x300>", thumb: "35x35>" }, default_url: "/img/no-user-image.jpg"
    validates_attachment :avatar, content_type: { content_type: /^image\/(png|gif|jpeg|jpg)/, message: "must be in the format png|gif|jpg" }, size: { :in => 0..1000.kilobytes, message: "must be less than 1MB" }
    
    def hire(applicant)
        employees.create(user_id: applicant.id, hiring_date: Date.today.to_date)
    end

    def terminate(current_employee)
        employees.find_by(user_id: current_employee.id).destroy
    end

    def an_employee?(applicant)
        users.pluck(:id).include?(applicant.id)
    end

end
