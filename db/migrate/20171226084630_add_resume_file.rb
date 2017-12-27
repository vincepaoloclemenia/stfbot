class AddResumeFile < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :resume_file_name, :string
    add_column :users, :resume_content_type, :string
    add_column :users, :resume_updated_at, :datetime
    add_column :users, :resume_file_size, :integer
  end
end
