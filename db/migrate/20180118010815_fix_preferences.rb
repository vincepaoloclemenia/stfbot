class FixPreferences < ActiveRecord::Migration[5.1]
  def change
    remove_column :preferences, :keywords
    remove_column :preferences, :position
    remove_column :preferences, :level
    remove_column :preferences, :function
    add_column :preferences, :titles, :string, array: true, default: []
    add_column :preferences, :positions, :string, array: true, default: []
    add_column :preferences, :levels, :string, array: true, default: []
    add_column :preferences, :functions, :string, array: true, default: []
  end
end
