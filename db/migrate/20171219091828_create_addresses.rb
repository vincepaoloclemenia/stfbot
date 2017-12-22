class CreateAddresses < ActiveRecord::Migration[5.1]
  def change
    create_table :addresses do |t|
      t.belongs_to :user, index: true
      t.string :country
      t.string :state
      t.string :city
      t.string :street

      t.timestamps
    end
  end
end
