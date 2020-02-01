# frozen_string_literal: true

module Types
  class AccountType < Types::BaseObject
    field :id, type: Integer, null: false
    field :name, type: String, null: false

  end
end
