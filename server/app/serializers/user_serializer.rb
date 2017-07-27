class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :events, :friends, :icon
end
