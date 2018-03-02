class AddIndexForTimelogs < ActiveRecord::Migration[5.1]
  def change
    add_belongs_to :timelogs, :company
  end
end
