class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :events, :friends, :icon, :bio, :current_city_lat, :current_city_lng, :current_city
end
