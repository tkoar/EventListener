module Api
  module V1
    class UsersController < ApplicationController
      def index
        @users = User.all
        render json: @users
      end

      def create
        user = User.create(name: user_params[:name], email: user_params[:email], userID: user_params[:userID], accessToken: user_params[:accessToken])
        user_events = params[:user][:events][:data].each do |event|
          location = Location.new(event["place"]["location"])
          byebug
          location.save
          event = Event.new({description: event['description'], fb_event_id: event['id'], name: event['name'], rsvp_status: event['rsvp_status'], start_time: event['start_time'], last_action: "added an event:"})
          event.locations << location
          event.save
        end
        user.events << user_events
      end

      private

      def user_params
        params.require(:user).permit(:user)
      end
    end
  end
end
