class AddColumnCurrentCityToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :current_city_lat, :string, default: "40.705163"
    add_column :users, :current_city_lng, :string, default: "-74.014049"
  end
end
