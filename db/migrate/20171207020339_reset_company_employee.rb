class ResetCompanyEmployee < ActiveRecord::Migration[5.1]
  def change
    drop_table :company_employees

    create_table :company_employees do |t|
      t.integer :employee_id
      t.integer :unemployee_id
      t.date :hiring_date

      t.timestamps null: false
    end

    add_index :company_employees, :employee_id
    add_index :company_employees, :unemployee_id
    add_index :company_employees, [:employee_id, :unemployee_id], unique: true
  end
end
