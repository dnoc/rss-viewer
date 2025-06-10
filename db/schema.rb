# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_06_05_164530) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "feed_items", force: :cascade do |t|
    t.bigint "feed_id", null: false
    t.string "title", null: false
    t.string "link", null: false
    t.text "description"
    t.string "media_url"
    t.string "guid", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "read", default: false, null: false
    t.string "media_type"
    t.index ["feed_id"], name: "index_feed_items_on_feed_id"
  end

  create_table "feeds", force: :cascade do |t|
    t.string "title", null: false
    t.string "url", null: false
    t.string "link"
    t.string "image_url"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "feed_items", "feeds"
end
