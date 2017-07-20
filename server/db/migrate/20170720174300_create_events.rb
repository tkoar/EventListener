class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :description
      t.integer :fb_event_id
      t.string :name
      t.string :last_action
      t.string :rsvp_status
      t.datetime :start_time

      t.timestamps
    end
  end
end
