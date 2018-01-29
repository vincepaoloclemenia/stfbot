class FixWorkExperience < ActiveRecord::Migration[5.1]
  def change
    change_column :work_experiences, :job_description, :text
    add_column :work_experiences, :achievements, :text
  end
end
