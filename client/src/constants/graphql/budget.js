import gql from 'graphql-tag'

export const GET_TRANSACTIONS_QUERY = gql`
query GetTransactions {
  getTransactions {
    id
    description
    amountInCents
    purchasedOn
    accountId
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
    accountId
  }
}
`

export const GET_ACCOUNTS_QUERY = gql`
query GetAccounts {
  getAccounts {
    id
    name
  }
}
`
