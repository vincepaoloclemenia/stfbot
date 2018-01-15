class CreateApplications < ActiveRecord::Migration[5.1]
  def change
    create_table :applications do |t|
      t.belongs_to :jobs, index: true
      t.belongs_to :users, index: true
      
      t.timestamps
    end
  end
end
