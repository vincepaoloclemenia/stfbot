class CreateJobs < ActiveRecord::Migration[5.1]
  def change
    create_table :jobs do |t|
      t.belongs_to :company, index: true
      t.string :title
      t.string :description
      t.string :location
      t.string :industry
      t.string :gender
      t.integer :exp_min
      t.integer :exp_max

      t.timestamps
    end
  end
end
