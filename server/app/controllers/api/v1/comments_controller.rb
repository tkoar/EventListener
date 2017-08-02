module Api
  module V1
    class CommentsController < ApplicationController
      def index
        @comments = Comment.all
        render json: @comments
      end

      def show
        render json: Event.find(params[:id])
      end

      def create
        comment = Comment.new(comment_params)
        user = User.find(comment_params[:user_id])
        event = Event.find(comment_params[:event_id])
        if comment.save
          user.comments << comment
          event.comments << comment
          render json: {success: "your comment was successfully created!"}
        else
          render json: {success: "your comment was successfully created!"}
        end
      end

      def delete

      end

      private

      def comment_params
        params.require(:comment).permit(:text, :user_id, :event_id, :icon, :username)
      end
    end
  end
end
