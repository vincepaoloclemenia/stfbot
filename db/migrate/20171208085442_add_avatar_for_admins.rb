class AddAvatarForAdmins < ActiveRecord::Migration[5.1]
  def change
    add_column :admins, :avatar_file_name, :string
    add_column :admins, :avatar_content_type, :string
    add_column :admins, :avatar_file_size, :integer
    add_column :admins, :avatar_updated_at, :datetime
  end
end
