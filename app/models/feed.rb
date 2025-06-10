# frozen_string_literal: true

class Feed < ApplicationRecord
  has_many :feed_items, -> { order(created_at: :desc) }, dependent: :destroy

  validates :title, presence: true
  validates :url, presence: true, uniqueness: true

  def self.fetch_and_create_from_url(url)
      rss = RSS::Parser.parse(url, false)
      raise ActiveRecord::RecordNotUnique, "Feed already exists for URL: #{url}" if Feed.exists?(url:)

      feed = create!(
        title: rss.channel.title,
        url:,
        link: rss.channel.link,
        image_url: rss.channel.image&.url,
        description: rss.channel.description
      )
      rss.channel.items.first(100).each do |item|
        FeedItem.create!(
          feed:,
          title: item.title,
          link: item.link,
          description: item.description,
          media_type: item.enclosure&.type,
          media_url: item.enclosure&.url,
          guid: item.guid.content
        )
      end
  rescue RSS::NotWellFormedError => e
      Rails.logger.error "Failed to parse RSS feed from #{url}: #{e.message}"
      nil
  end
end
