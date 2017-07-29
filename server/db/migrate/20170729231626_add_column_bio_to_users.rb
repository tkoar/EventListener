class AddColumnBioToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :bio, :string, default: "Bio goes here..."
  end
end
