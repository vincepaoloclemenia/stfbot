class RemoveReference < ActiveRecord::Migration[5.1]
  def change
    remove_index :company_employees, column: :company_id
  end
end
