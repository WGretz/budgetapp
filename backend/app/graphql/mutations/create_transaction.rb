module Mutations
  class CreateTransaction < BaseMutation
    argument :attributes, Types::TransactionAttributes, required: true

    # return type from the mutation
    type Types::TransactionType

    def resolve(attributes:)
      puts(attributes.to_h)
      puts attributes.purchased_on
      Transaction.create!(
        description: attributes.description,
        amount_in_cents: attributes.amount_in_cents,
        purchased_on: attributes.purchased_on,
        account_id: attributes.account_id,
      )
    end
  end
end
