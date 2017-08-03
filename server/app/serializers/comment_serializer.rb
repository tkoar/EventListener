class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :event, :user
end
