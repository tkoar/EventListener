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

      def update
        events = params[:events]
        events.each do |e|
          event = Event.find(e[:id])
          event[:owner_icon] = e[:owner_icon]
          event.save
        end
      end

    end
  end
end
