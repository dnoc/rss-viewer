namespace :feeds do
  task :reload, [:force] => :environment do |_task, args|
    feeds = Feed.all
    feeds.each do |feed|
      if !args[:force] && feed.updated_at && feed.updated_at > 1.day.ago
        puts "Skipping #{feed.title} as it was updated recently."
        next
      end

      begin
        rss = RSS::Parser.parse(feed.url, false)
        feed.update(
          title: rss.channel.title,
          link: rss.channel.link,
          image_url: rss.channel.image&.url,
          description: rss.channel.description
        )

        rss.channel.items.first(100).each do |item|
          feed.feed_items.find_or_create_by(guid: item.guid.content) do |feed_item|
            feed_item.feed = feed
            feed_item.title = item.title
            feed_item.link = item.link
            feed_item.description = item.description
            feed_item.media_url = item.enclosure&.url
            feed_item.media_type = item.enclosure&.type
          end
        end

        puts "Feed #{feed.title} updated successfully."
      rescue RSS::NotWellFormedError => e
        puts "Failed to parse RSS feed from #{feed.url}: #{e.message}"
      end
    end
  end
end
