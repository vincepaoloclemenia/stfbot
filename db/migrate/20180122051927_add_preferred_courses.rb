class AddPreferredCourses < ActiveRecord::Migration[5.1]
  def change
    add_column :jobs, :preferred_courses, :string, array: true, default: []
  end
end
