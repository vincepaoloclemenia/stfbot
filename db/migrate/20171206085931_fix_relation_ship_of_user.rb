class FixRelationShipOfUser < ActiveRecord::Migration[5.1]
  def change
    remove_reference :company_employees, :user, index: true
    add_reference :users, :company_employee, index: true
  end
end
