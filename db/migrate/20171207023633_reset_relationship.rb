class ResetRelationship < ActiveRecord::Migration[5.1]
  def change
    drop_table :company_employees
    create_table :company_employees do |t|
      t.belongs_to :user, index: true
      t.belongs_to :company, index: true
      t.date :hiring_date

      t.timestamps null: false
    end

  end
end
