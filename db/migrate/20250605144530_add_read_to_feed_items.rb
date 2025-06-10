class AddReadToFeedItems < ActiveRecord::Migration[7.1]
  def change
    add_column :feed_items, :read, :boolean, default: false, null: false
  end
end