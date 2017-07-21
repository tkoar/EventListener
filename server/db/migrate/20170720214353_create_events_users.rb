class CreateEventsUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :events_users do |t|
      t.references :user
      t.references :event
    end
  end
end
