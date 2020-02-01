class Transaction < ApplicationRecord

  belongs_to :category, required: false

  scope :this_year, -> { where(purchased_on: Date.today.beginning_of_year..Float::INFINITY) }
  scope :debits, -> { where(amount_in_cents: Float::INFINITY..0) }

end
