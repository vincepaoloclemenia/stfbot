class AddFieldsForCompany < ActiveRecord::Migration[5.1]
  def change
    add_column :companies, :industry, :string
    add_column :companies, :number_of_employees, :string
    add_column :companies, :website, :string
    add_column :companies, :benefits, :string
    add_column :companies, :language_spoken, :string
  end
end
