class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :accessToken
      t.string :userID
      t.string :icon, default: "https://s-media-cache-ak0.pinimg.com/originals/1b/62/4e/1b624e3f7915cf91c6dfa2219da247a5.png"

      t.timestamps
    end
  end
end
