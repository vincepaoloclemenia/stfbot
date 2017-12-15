class FixColumnNameForWorkExperience < ActiveRecord::Migration[5.1]
  def change
    rename_column :work_experiences, :empoyment_to, :employment_to
  end
end
