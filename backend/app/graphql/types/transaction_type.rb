# frozen_string_literal: true

module Types
  class TransactionType < Types::BaseObject
    field :id, type: Integer, null: false
    field :description, type: String, null: false
    field :amount_in_cents, type: Integer, null: false
    field :purchased_on, type: Types::Date, null: true
    field :account_id, type: Integer, null: true

  end
end
