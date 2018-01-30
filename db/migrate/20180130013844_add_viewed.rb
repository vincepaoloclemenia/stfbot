class AddViewed < ActiveRecord::Migration[5.1]
  def change
    add_column :job_applications, :seen, :boolean, default: false
    add_column :viewers, :checked, :boolean, default: false
  end
end
