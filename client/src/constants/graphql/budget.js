import gql from 'graphql-tag'

export const GET_TRANSACTIONS_QUERY = gql`
query GetTransactions {
  getTransactions {
    id
    description
    amountInCents
  }
}
`
