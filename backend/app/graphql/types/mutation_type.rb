module Types
  class MutationType < Types::BaseObject
    field :createTransaction, mutation: Mutations::CreateTransaction
  end
end
