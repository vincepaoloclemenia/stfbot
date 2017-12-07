class RemoveCompanyId < ActiveRecord::Migration[5.1]
  def change
    remove_column :company_employees, :company_id
  end
end
