class AddAvatarForCompany < ActiveRecord::Migration[5.1]
  def change
    add_column :companies, :avatar_file_name, :string
    add_column :companies, :avatar_content_type, :string
    add_column :companies, :avatar_file_size, :integer
    add_column :companies, :avatar_updated_at, :datetime
    create_table :location do |t|
      t.belongs_to :company, index: true
      t.string :country
      t.string :street
      t.string :state
      t.string :city
    end
  end
end
