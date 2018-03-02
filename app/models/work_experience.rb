class WorkExperience < ApplicationRecord
    #t.bigint "user_id"
    #t.string "company_name"
    #t.string "job_title"
    #t.string "job_description"
    #t.date "employment_from"
    #t.date "employment_to"
    #t.string "job_level"
    #t.string "job_functions"
    #t.datetime "created_at", null: false
    #t.datetime "updated_at", null: false
    #t.boolean "employment_status", default: false
    #t.index ["user_id"], name: "index_work_experiences_on_user_id"
    belongs_to :user
    validates :company_name, :job_title, :employment_from, :job_level, :job_functions, presence: true

    validate :regulate_employment

    def regulate_employment 
        if user.employed_in_resume? && employment_status == true
            errors.add('Current employment', ' must be only one!')   
        end
    end 

end
