class CreateEducations < ActiveRecord::Migration[5.1]
  def change
    create_table :educations do |t|
      t.belongs_to :user, index: true
      t.string :education_attainment
      t.string :school_name
      t.date :attend_from
      t.date :attend_to
      t.boolean :graduated?
      t.text :accomplishments

      t.timestamps
    end
  end
end
