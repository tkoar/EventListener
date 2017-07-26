class User < ApplicationRecord
  has_and_belongs_to_many :events
  has_many :friendships
  has_many :friends, through: :friendships
end
