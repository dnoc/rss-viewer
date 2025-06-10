class Api::FeedsController < ApplicationController
  def index
    feeds = Feed.all
    # rss = RSS::Parser.parse('https://feeds.arstechnica.com/arstechnica/gadgets', false)

    # render json: rss, status: :ok
    render json: feeds, include: [:feed_items], status: :ok
  end

  def create
    feed = Feed.fetch_and_create_from_url(create_params[:url])
    if feed
      render json: Feed.all, include: [:feed_items], status: :created
    else
      render json: { error: 'Failed to fetch or create feed' }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotUnique => e
    head :conflict, json: { error: e.message }
  end

  private

  def create_params
    params.require(:feed).permit(:url)
  end
end
