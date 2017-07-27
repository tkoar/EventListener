class AddColumnOwnerIconToEvents < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :owner_icon, :string
    add_column :events, :owner_id, :integer
  end
end
