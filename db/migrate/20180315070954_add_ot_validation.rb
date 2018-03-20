class AddOtValidation < ActiveRecord::Migration[5.1]
  def change
    add_column :timelogs, :valid_ot, :boolean, default: false
  end
end
