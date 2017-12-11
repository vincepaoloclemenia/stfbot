class CreateWorkExperiences < ActiveRecord::Migration[5.1]
  def change
    create_table :work_experiences do |t|
      t.belongs_to :user, index: true
      t.string :company_name
      t.string :job_title
      t.string :job_description
      t.date :employment_from
      t.date :empoyment_to
      t.string :job_level
      t.string :job_functions

      t.timestamps
    end
  end
end
