class AddScaleForBreakHoursAndTotalHours < ActiveRecord::Migration[5.1]
  def change
    change_column :timelogs, :total_hours, :decimal, precision: 5, scale: 2
    change_column :timelogs, :total_break_hours, :decimal, precision: 5, scale: 2
  end
end
