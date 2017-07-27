module Api
  module V1
    class UsersController < ApplicationController

      def show
        user = User.find(params[:id])
        render json: user
      end

      def index
        @users = User.all
        render json: @users
      end

      def create

        if User.find_by(userID: user_params[:userID])
          @user = User.find_by(userID: user_params[:userID])
        else
          @user = User.create(name: user_params[:name], email: user_params[:email], userID: user_params[:userID], accessToken: user_params[:accessToken])
        end
        user_events = params[:user][:events][:data].each do |event|
          location = Location.new({name: event['place']['name'], city: event['place']['location']['city'], country: event['place']['location']['country'], latitude: event['place']['location']['latitude'], longitude: event['place']['location']['longitude'], state: event['place']['location']['state'], street: event['place']['location']['street'], zip: event['place']['location']['zip']})

          if Event.find_by(fb_event_id: event['id'])
            e = Event.find_by(fb_event_id: event['id'])
          else
            e = Event.new({description: event['description'], fb_event_id: event['id'], name: event['name'], rsvp_status: event['rsvp_status'], start_time: event['start_time'], last_action: "added an event:", owner_icon: @user.icon, owner_id: @user.id})
            e.save
            e.locations << location
            location.save
          end
          @user.events << e unless @user.events.detect { |el| el.fb_event_id === e['fb_event_id']}

        end

      end

      def update
        user = User.find(params[:userId])
        user.icon = params[:url]
        user.save
      end

      private

      def user_params
        params.require(:user).permit(:accessToken, :email, :events, :expiresIn, :id, :name, :picture, :signedRequest, :userID)
      end
    end
  end
end
