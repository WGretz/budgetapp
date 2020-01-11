import gql from 'graphql-tag'

export const GET_TRANSACTIONS_QUERY = gql`
query GetTransactions {
  getTransactions {
    id
    description
    amountInCents
    purchasedOn
  }
}
`

export const NEW_TRANSACTION_MUTATION = gql`
mutation MakeTransaction( $attributes: TransactionAttributes! ) {
  createTransaction (
    attributes: $attributes
  ) {
    id
    description
    amountInCents
    purchasedOn
  }
}
`
