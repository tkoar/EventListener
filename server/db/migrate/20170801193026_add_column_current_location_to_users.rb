class AddColumnCurrentLocationToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :current_city, :string, default: "New York, NY"
  end
end
