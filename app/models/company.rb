class Company < ApplicationRecord
    has_many :employees, class_name: 'CompanyEmployee'
    has_many :users, class_name: 'User', through: :employees
    
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
