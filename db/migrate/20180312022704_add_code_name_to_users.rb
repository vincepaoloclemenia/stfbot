class AddCodeNameToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :code_num, :bigint
  end
end
