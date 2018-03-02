class AddLunchOutAndLunchIn < ActiveRecord::Migration[5.1]
  def change
    add_column :timelogs, :lunchout, :datetime
    add_column :timelogs, :lunchin, :datetime
    add_column :timelogs, :undertime, :decimal, precision: 5, scale: 2
  end
end
