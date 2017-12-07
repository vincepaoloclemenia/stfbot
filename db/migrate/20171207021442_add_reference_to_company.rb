class AddReferenceToCompany < ActiveRecord::Migration[5.1]
  def change
    add_reference :company_employees, :company, index: true
  end
end
