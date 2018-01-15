class AddFieldsForJobs < ActiveRecord::Migration[5.1]
  def change
    add_column :jobs, :user_id, :bigint
    add_column :jobs, :applicant_id, :bigint
    add_column :jobs, :type_of_employee, :string
    add_column :jobs, :level_of_expertise, :string
    remove_column :jobs, :exp_min
    remove_column :jobs, :exp_max
    rename_column :qualifications, :skill, :skill_name
    add_column :qualifications, :years_of_experience, :string
    remove_column :qualifications, :type
    remove_column :qualifications, :position

    add_index :jobs, [:user_id, :applicant_id], unique: true
  end
end
