class Preference < ApplicationRecord
    belongs_to :user, -> { where role: 'applicant' }

    validates :titles, :levels, :positions, :functions, :location, :salary, :shift, presence: true
end
