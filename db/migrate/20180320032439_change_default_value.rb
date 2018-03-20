class ChangeDefaultValue < ActiveRecord::Migration[5.1]
  def change
    change_column :timelogs, :valid_ot, :boolean, default: nil
  end
end
