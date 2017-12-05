class AddFieldsForAdmins < ActiveRecord::Migration[5.1]
  def change
    add_column :admins, :admin_name, :string
    add_column :admins, :first_name, :string
    add_column :admins, :last_name, :string
    add_reference :users, :company
  end
end
