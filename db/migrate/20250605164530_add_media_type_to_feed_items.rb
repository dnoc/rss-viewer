class AddMediaTypeToFeedItems < ActiveRecord::Migration[7.1]
  def change
    add_column :feed_items, :media_type, :string
    rename_column :feed_items, :image_url, :media_url
  end
end
