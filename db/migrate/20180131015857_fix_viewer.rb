class FixViewer < ActiveRecord::Migration[5.1]
  def change
    add_column :job_applications, :qualified, :boolean, default: true
  end
end
