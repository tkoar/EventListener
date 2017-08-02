class AddColumnPrivacyToEvents < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :private, :boolean, default: false
  end
end
