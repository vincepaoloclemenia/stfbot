class AddProfessionalStatusUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :is_professional, :boolean, default: false
  end
end
