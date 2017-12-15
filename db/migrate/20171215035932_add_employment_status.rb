class AddEmploymentStatus < ActiveRecord::Migration[5.1]
  def change
    add_column :work_experiences, :employment_status, :boolean, default: false
  end
end
