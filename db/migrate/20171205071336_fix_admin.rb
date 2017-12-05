class FixAdmin < ActiveRecord::Migration[5.1]
  def change
    rename_column :admins, :admin_name, :username
  end
end
