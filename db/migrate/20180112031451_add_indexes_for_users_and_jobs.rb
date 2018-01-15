class AddIndexesForUsersAndJobs < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :job_id, :bigint

    add_index :users, :job_id
  end
end
