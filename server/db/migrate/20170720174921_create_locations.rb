class CreateLocations < ActiveRecord::Migration[5.1]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :city
      t.string :state
      t.string :country
      t.string :zip
      t.string :street
      t.string :latitude
      t.string :longitude
      t.references :event
      t.timestamps
    end
  end
end
