class Education < ApplicationRecord
    belongs_to :user
    validates_presence_of :education_attainment, :attend_from, :attend_to
end
