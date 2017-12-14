class FixEducationStatus < ActiveRecord::Migration[5.1]
  def change
    rename_column :educations, :graduated?, :status
  end
end
