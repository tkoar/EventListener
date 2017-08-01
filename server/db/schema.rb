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

ActiveRecord::Schema.define(version: 20170731182238) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.string "description"
    t.string "fb_event_id"
    t.string "name"
    t.string "last_action"
    t.string "rsvp_status"
    t.datetime "start_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "owner_icon"
    t.integer "owner_id"
  end

  create_table "events_users", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "event_id"
    t.index ["event_id"], name: "index_events_users_on_event_id"
    t.index ["user_id"], name: "index_events_users_on_user_id"
  end

  create_table "friendships", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "friend_id"
    t.index ["friend_id", "user_id"], name: "index_friendships_on_friend_id_and_user_id", unique: true
    t.index ["user_id", "friend_id"], name: "index_friendships_on_user_id_and_friend_id", unique: true
  end

  create_table "locations", force: :cascade do |t|
    t.string "name"
    t.string "city"
    t.string "state"
    t.string "country"
    t.string "zip"
    t.string "street"
    t.string "latitude"
    t.string "longitude"
    t.bigint "event_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_locations_on_event_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "accessToken"
    t.string "userID"
    t.string "icon", default: "https://s-media-cache-ak0.pinimg.com/originals/1b/62/4e/1b624e3f7915cf91c6dfa2219da247a5.png"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "bio", default: "Bio goes here..."
    t.string "current_city_lat", default: "40.705163"
    t.string "current_city_lng", default: "-74.014049"
  end

end
