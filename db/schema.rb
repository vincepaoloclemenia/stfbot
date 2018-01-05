# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180105072826) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.bigint "user_id"
    t.string "country"
    t.string "state"
    t.string "city"
    t.string "street"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_addresses_on_user_id"
  end

  create_table "admins", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.string "first_name"
    t.string "last_name"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "avatar_file_name"
    t.string "avatar_content_type"
    t.integer "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.index ["confirmation_token"], name: "index_admins_on_confirmation_token", unique: true
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.integer "total_of_employees", default: 0
    t.string "telefax"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "avatar_file_name"
    t.string "avatar_content_type"
    t.integer "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string "slug"
    t.text "overview"
    t.text "why_join_us"
  end

  create_table "company_employees", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "company_id"
    t.date "hiring_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_company_employees_on_company_id"
    t.index ["user_id"], name: "index_company_employees_on_user_id"
  end

  create_table "educations", force: :cascade do |t|
    t.bigint "user_id"
    t.string "education_attainment"
    t.string "school_name"
    t.date "attend_from"
    t.date "attend_to"
    t.boolean "status"
    t.text "accomplishments"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "course"
    t.index ["user_id"], name: "index_educations_on_user_id"
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id"
    t.index ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type"
  end

  create_table "inquiries", force: :cascade do |t|
    t.string "company_name"
    t.string "address"
    t.string "industry"
    t.string "first_name"
    t.string "email"
    t.string "contact"
    t.string "position"
    t.string "company_size"
    t.string "info_from"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "last_name"
  end

  create_table "jobs", force: :cascade do |t|
    t.bigint "company_id"
    t.string "title"
    t.string "description"
    t.string "location"
    t.string "industry"
    t.string "gender"
    t.integer "exp_min"
    t.integer "exp_max"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.index ["company_id"], name: "index_jobs_on_company_id"
  end

  create_table "locations", force: :cascade do |t|
    t.bigint "company_id"
    t.string "state"
    t.string "street"
    t.string "city"
    t.string "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_locations_on_company_id"
  end

  create_table "qualifications", force: :cascade do |t|
    t.bigint "job_id"
    t.string "skill"
    t.string "type"
    t.string "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_id"], name: "index_qualifications_on_job_id"
  end

  create_table "skills", force: :cascade do |t|
    t.bigint "user_id"
    t.string "name"
    t.string "literacy_level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_skills_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "username"
    t.string "avatar_file_name"
    t.string "avatar_content_type"
    t.integer "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string "role"
    t.bigint "company_id"
    t.bigint "company_employee_id"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "address"
    t.string "contact"
    t.boolean "employed?", default: false
    t.date "birthdate"
    t.string "gender"
    t.string "resume_file_name"
    t.string "resume_content_type"
    t.datetime "resume_updated_at"
    t.integer "resume_file_size"
    t.string "slug"
    t.index ["company_employee_id"], name: "index_users_on_company_employee_id"
    t.index ["company_id"], name: "index_users_on_company_id"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "work_experiences", force: :cascade do |t|
    t.bigint "user_id"
    t.string "company_name"
    t.string "job_title"
    t.string "job_description"
    t.date "employment_from"
    t.date "employment_to"
    t.string "job_level"
    t.string "job_functions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "employment_status", default: false
    t.index ["user_id"], name: "index_work_experiences_on_user_id"
  end

end
