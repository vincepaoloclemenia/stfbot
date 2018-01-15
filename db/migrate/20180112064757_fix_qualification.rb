class FixQualification < ActiveRecord::Migration[5.1]
  def change
    drop_table :qualifications
    add_column :jobs, :education_attainment, :string
    add_column :jobs, :min_exp, :string
    add_column :jobs, :max_exp, :string
    add_column :jobs, :qualifications, :string
  end
end
