# frozen_string_literal: true
class FeedItem < ApplicationRecord
  # Associations
  belongs_to :feed

  # Validations
  validates :title, presence: true
  validates :link, presence: true, uniqueness: true
  validates :guid, presence: true, uniqueness: true

  # Callbacks
  before_validation :set_guid

  private

  def set_guid
    self.guid ||= link if link.present?
  end
end
