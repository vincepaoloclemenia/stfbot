class CreateCountries < ActiveRecord::Migration[5.1]
  def change
    create_table :locations do |t|
      t.belongs_to :company, index: true
      t.string :state
      t.string :street
      t.string :city
      t.string :country

      t.timestamps
    end
  end
end
