module Api
  module V1
    class EventsController < ApplicationController

      def index
        @events = Event.all
        render json: @events
      end

      def show
        render json: Event.find(params[:id])
      end

      def create
        user = User.find(params[:event][:owner_id])
        event = Event.find_by(fb_event_id: params[:event][:fb_event_id])
        newId = Event.last.id + 1
        newEvent = event.dup
        location = Location.find_by(event_id: event.id).dup
        eventArr = user.events.select { |e| e.fb_event_id === newEvent.fb_event_id }
        if (eventArr.length < 1 && location != nil)
          newEvent.id = newId
          newEvent.owner_id = user.id
          newEvent.owner_icon = user.icon
          newEvent.location = location
          newEvent.save
          user.events << newEvent
          render json: {success: 'Have fun at your event!'}
        else
          render json: {error: 'Something went wrong! You probably already have this event in your events!'}
        end
      end

      def update
        events = params[:events]
        events.each do |e|
          event = Event.find(e[:id])
          event[:owner_icon] = e[:owner_icon]
          event.save
        end
      end

      def delete
        event = Event.find(params[:id])
        event.destroy
      end

    end
  end
end
