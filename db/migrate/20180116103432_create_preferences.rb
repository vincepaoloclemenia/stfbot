class CreatePreferences < ActiveRecord::Migration[5.1]
  def change
    create_table :preferences do |t|
      t.belongs_to :user, index: true
      t.string :position
      t.string :shift
      t.string :location
      t.string :level
      t.string :keywords
      t.string :function
      t.string :salary

      t.timestamps
    end
  end
end
