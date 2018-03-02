class Timelog < ApplicationRecord
    belongs_to :user, -> { includes(:company).where( role: 'regular_employee' ) }
end
