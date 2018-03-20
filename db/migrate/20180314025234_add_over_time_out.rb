class AddOverTimeOut < ActiveRecord::Migration[5.1]
  def change
    add_column :timelogs, :overtime_out, :datetime
  end
end
