class CreateViewers < ActiveRecord::Migration[5.1]
  def change
    create_table :viewers do |t|
      t.belongs_to :job, index: true, unique: true
      t.belongs_to :user, index: true, unique: true

      t.timestamps
    end
  end
end
