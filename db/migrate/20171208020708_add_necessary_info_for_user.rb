class AddNecessaryInfoForUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :address, :string
    add_column :users, :contact, :string
    add_column :users, :employed?, :boolean, default: false
  end
end
