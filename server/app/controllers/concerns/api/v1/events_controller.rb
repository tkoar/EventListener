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

    end
  end
end
