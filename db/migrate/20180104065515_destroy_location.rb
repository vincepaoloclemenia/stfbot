class DestroyLocation < ActiveRecord::Migration[5.1]
  def change
    drop_table :location
  end
end
