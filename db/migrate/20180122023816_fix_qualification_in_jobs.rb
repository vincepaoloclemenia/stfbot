class FixQualificationInJobs < ActiveRecord::Migration[5.1]
  def change
    remove_column :jobs, :qualifications
    add_column :jobs, :requirements, :string, array: true, default: []
  end
end
