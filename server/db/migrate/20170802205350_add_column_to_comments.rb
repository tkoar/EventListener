class AddColumnToComments < ActiveRecord::Migration[5.1]
  def change
    add_column :comments, :icon, :string, default: "https://s-media-cache-ak0.pinimg.com/originals/62/6c/cc/626ccc354c18074e99b0b2ecbd84f3b9.png"
  end
end
