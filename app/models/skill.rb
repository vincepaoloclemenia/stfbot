class Skill < ApplicationRecord
    belongs_to :user
    validates_presence_of :name, :literacy_level
end
