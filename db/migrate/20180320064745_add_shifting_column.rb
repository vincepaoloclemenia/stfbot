class AddShiftingColumn < ActiveRecord::Migration[5.1]
  def change
    add_column :timelogs, :shift, :string
  end
end
