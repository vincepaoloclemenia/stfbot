class CreateQualifications < ActiveRecord::Migration[5.1]
  def change
    create_table :qualifications do |t|
      t.belongs_to :job, index: true
      t.string :skill
      t.string :type
      t.string :position

      t.timestamps
    end
  end
end
