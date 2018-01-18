class CreateJobTitles < ActiveRecord::Migration[5.1]
  def change
    create_table :job_titles do |t|
      t.string :word

      t.timestamps
    end
  end
end
