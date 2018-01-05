class AddCompanyOverViewMissionVision < ActiveRecord::Migration[5.1]
  def change
    add_column :companies, :overview, :text
    add_column :companies, :why_join_us, :text
  end
end
