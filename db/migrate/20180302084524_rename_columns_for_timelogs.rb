class RenameColumnsForTimelogs < ActiveRecord::Migration[5.1]
  def change
    rename_column :timelogs, :lunchin, :returned
    rename_column :timelogs, :lunchout, :break
  end
end
