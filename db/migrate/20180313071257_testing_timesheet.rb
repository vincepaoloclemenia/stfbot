class TestingTimesheet < ActiveRecord::Migration[5.1]
  def change
    add_column :timelogs, :sample, :string
  end
end
