class Api::FeedItemsController < ApplicationController
  def update
    feed_item = FeedItem.find(update_params[:id])
    if feed_item.update(update_params)
      render json: feed_item, status: :ok
    else
      render json: { error: 'Failed to update feed item' }, status: :unprocessable_entity
    end
  end

  private

  def update_params
    params.require(:feed_item).permit(:id, :read)
  end
end
