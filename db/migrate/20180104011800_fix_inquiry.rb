class FixInquiry < ActiveRecord::Migration[5.1]
  def change
    rename_column :inquiries, :company_function, :first_name
    add_column :inquiries, :last_name, :string
  end
end
