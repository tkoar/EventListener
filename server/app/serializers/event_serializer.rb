class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :fb_event_id, :last_action, :rsvp_status, :start_time, :created_at, :updated_at, :location, :users, :owner_id, :owner_icon
end
