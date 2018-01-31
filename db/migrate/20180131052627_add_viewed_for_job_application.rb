class AddViewedForJobApplication < ActiveRecord::Migration[5.1]
  def change
    add_column :job_applications, :read, :boolean, default: false
  end
end
