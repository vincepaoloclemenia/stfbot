class AddEducationlevelQualification < ActiveRecord::Migration[5.1]
  def change
    add_column :qualifications, :education_attainment, :string
    add_column :jobs, :salary_offered, :string
    add_column :jobs, :requisition_number, :string, unique: true
  end
end
