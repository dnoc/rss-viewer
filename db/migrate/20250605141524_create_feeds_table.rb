class CreateFeedsTable < ActiveRecord::Migration[7.1]
  def change
    create_table :feeds do |t|
      t.string :title, null: false
      t.string :url, null: false
      t.string :link
      t.string :image_url
      t.text :description

      t.timestamps
    end
  end
end
