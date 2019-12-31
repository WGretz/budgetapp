module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :get_transactions, [TransactionType], null: false

    def get_transactions
      Transaction.all
    end
  end
end
