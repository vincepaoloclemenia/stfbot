class AddOvertimeIn < ActiveRecord::Migration[5.1]
  def change
    change_column :timelogs, :break, :datetime
    rename_column :timelogs, :break, :overtime_in
  end
end
