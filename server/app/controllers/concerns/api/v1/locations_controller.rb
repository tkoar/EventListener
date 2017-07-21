module Api
  module V1
    class LocationsController < ApplicationController
      def index
        @locations = Location.all
        render json: @locations
      end
    end
  end
end
