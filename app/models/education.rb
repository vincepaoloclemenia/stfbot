class Education < ApplicationRecord
    #t.bigint "user_id"
    #t.string "education_attainment"
    #t.string "school_name"
    #t.date "attend_from"
    #t.date "attend_to"
    #t.boolean "status"
    #t.text "accomplishments"
    #t.datetime "created_at", null: false
    #t.datetime "updated_at", null: false
    #t.string "course"
    #t.index ["user_id"], name: "index_educations_on_user_id"
    belongs_to :user
    validates :education_attainment, :attend_from, :attend_to, :school_name, presence: true
end
