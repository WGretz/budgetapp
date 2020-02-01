module Types
  class TransactionAttributes < Types::BaseInputObject
    argument :purchased_on, String, required: true
    argument :amount_in_cents, Integer, required: true
    argument :description, String, required: true
    argument :account_id, Integer, required: true
  end
end
