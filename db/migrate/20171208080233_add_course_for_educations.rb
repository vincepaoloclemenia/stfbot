class AddCourseForEducations < ActiveRecord::Migration[5.1]
  def change
    add_column :educations, :course, :string
  end
end
