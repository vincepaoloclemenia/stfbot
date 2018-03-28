class CreateHolidays < ActiveRecord::Migration[5.1]
  def change
    create_table :holidays do |t|
      t.belongs_to :company, index: true
      t.string :event_name
      t.date :holiday_date
      t.boolean :special_or_not, default: false
      t.timestamps
    end
  end
end
