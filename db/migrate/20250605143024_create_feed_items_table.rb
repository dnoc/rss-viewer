class CreateFeedItemsTable < ActiveRecord::Migration[7.1]
  def change
    create_table :feed_items do |t|
      t.references :feed, null: false, foreign_key: true
      t.string :title, null: false
      t.string :link, null: false
      t.text :description
      t.string :image_url
      t.string :guid, null: false

      t.timestamps
    end
  end
end