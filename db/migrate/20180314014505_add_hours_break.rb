class AddHoursBreak < ActiveRecord::Migration[5.1]
  def change
    add_column :timelogs, :total_break_hours, :decimal, precision: 2, scale: 2
    add_column :timelogs, :total_hours, :decimal, precision: 2, scale: 2
    remove_column :timelogs, :returned
    remove_column :timelogs, :sample
    remove_column :timelogs, :total_of_hours
  end
end
