class AddAllowedToHaveShiftingSchedule < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :shifting_schedule, :boolean, default: false
  end
end
