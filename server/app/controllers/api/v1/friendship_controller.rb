module Api
  module V1
    class FriendshipController < ApplicationController

      def update
        current_user = User.find(params[:friendAdder_id])
        added_user = User.find(params[:addedFriend_id])
        current_user.friends << added_user unless current_user.friends.include?(added_user)
        added_user.friends << current_user unless added_user.friends.include?(current_user)
      end

    end
  end
end
