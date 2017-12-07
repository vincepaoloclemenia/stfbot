class FixRelationshipForCompanyAndEmployees < ActiveRecord::Migration[5.1]
  def change
    add_column :company_employees, :employee_id, :integer
    add_column :company_employees, :unemployee_id, :integer

    add_index :company_employees, :employee_id
    add_index :company_employees, :unemployee_id
    add_index :company_employees, [:employee_id, :unemployee_id], unique: true
  end
end
