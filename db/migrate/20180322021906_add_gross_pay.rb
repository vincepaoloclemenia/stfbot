class AddGrossPay < ActiveRecord::Migration[5.1]
  def change
    add_column :timelogs, :gross_pay, :decimal, precision: 8, scale: 2
  end
end
