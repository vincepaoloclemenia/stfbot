class AddCredentialsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :birthdate, :date
    add_column :users, :gender, :string
  end
end
