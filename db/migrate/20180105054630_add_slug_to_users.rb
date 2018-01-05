class AddSlugToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :slug, :string
    add_column :companies, :slug, :string
    add_column :jobs, :slug, :string
  end
end
