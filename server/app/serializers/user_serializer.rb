class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :events, :friends
end
