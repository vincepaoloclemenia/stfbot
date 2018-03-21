class AddOtPayAndChangeValidOtAttrib < ActiveRecord::Migration[5.1]
  def change
    add_column :timelogs, :overtime_pay, :decimal, precision: 8, scale: 2
    change_column :timelogs, :valid_ot, :string
  end
end
