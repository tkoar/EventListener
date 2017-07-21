class Location < ApplicationRecord
  belongs_to :event, optional: true
end
