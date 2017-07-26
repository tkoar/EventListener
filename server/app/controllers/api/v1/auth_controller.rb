module Api
  module V1
    class AuthController < ApplicationController
      before_action :authorize_user!, only: [:show]

      def show
        render json: current_user
      end

    end
  end
end
