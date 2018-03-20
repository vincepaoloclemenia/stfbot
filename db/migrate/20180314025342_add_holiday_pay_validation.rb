class AddHolidayPayValidation < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :rate_per_hour, :decimal, precision: 8, scale: 2
    add_column :users, :min_flexi_time, :string
    add_column :users, :max_flexi_time, :string
    add_column :timelogs, :is_holiday, :boolean, default: false
    add_column :timelogs, :total_pay, :decimal, precision: 8, scale: 2
  end
end
