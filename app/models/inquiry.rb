class Inquiry < ApplicationRecord
    default_scope -> { order(created_at: :desc) }
end
