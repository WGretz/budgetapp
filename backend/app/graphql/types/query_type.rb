module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :get_transactions, [TransactionType], null: true
    field :get_accounts, [AccountType], null: true

    def get_transactions
      Transaction.limit(100)
    end

    def get_accounts
      Account.all
    end

  end
end
