class ChangePrecisionOfTotalHours < ActiveRecord::Migration[5.1]
  def change
    change_column :timelogs, :total_hours, :decimal, precision: 5
    change_column :timelogs, :total_break_hours, :decimal, precision: 5
  end
end
