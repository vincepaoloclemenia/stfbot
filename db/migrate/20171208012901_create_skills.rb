class CreateSkills < ActiveRecord::Migration[5.1]
  def change
    create_table :skills do |t|
      t.belongs_to :user, index: true
      t.string :name
      t.string :literacy_level

      t.timestamps
    end
  end
end
