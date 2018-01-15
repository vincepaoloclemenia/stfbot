class ChangeDescription < ActiveRecord::Migration[5.1]
  def change
    change_column :jobs, :description, :text
  end
end
