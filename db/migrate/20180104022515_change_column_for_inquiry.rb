class ChangeColumnForInquiry < ActiveRecord::Migration[5.1]
  def change
    change_column :inquiries, :company_size, :string
    change_column :inquiries, :info_from, :string
  end
end
