class CreateCompanies < ActiveRecord::Migration[5.1]
  def change
    create_table :companies do |t|
      t.string :name
      t.string :address
      t.integer :total_of_employees, default: 0
      t.string :telefax
      

      t.timestamps
    end
  end
end
