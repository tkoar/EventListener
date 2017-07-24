module Api
  module V1
    class AuthController < ApplicationController
      before_action :authorize_user!, only: [:show]

      def show
        render json: {
          id: user.id
          name: user.name,
          email: user.email
        }
      end

      

    end
  end
end
