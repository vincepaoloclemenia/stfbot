class CreateTimelogs < ActiveRecord::Migration[5.1]
  def change
    create_table :timelogs do |t|
      t.belongs_to :user
      t.datetime :login
      t.date :date
      t.datetime :logout
      t.datetime :break_out
      t.datetime :break_in
      t.decimal :overtime, precision: 5, scale: 2
      t.decimal :total_of_hours, precision: 5, scale: 2

      t.timestamps
    end
  end
end
