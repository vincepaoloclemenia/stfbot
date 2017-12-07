class CreateCompanyEmployees < ActiveRecord::Migration[5.1]
  def change
    create_table :company_employees do |t|
      t.belongs_to :user, index: true
      t.belongs_to :company, index: true
      t.date :hiring_date

      t.timestamps
    end
  end
end
