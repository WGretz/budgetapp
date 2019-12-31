<template>
  <div>
    <table>
      <tr v-for="transaction in sortedTransactions" :key="transaction.id">
        <td data-cy="transaction-date">{{ transaction.purchasedOn }}</td>
        <td data-cy="transaction-description">{{ transaction.description }}</td>
        <td data-cy="transaction-amount">{{ transaction.amountInCents | budgetToCurrency }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { GET_TRANSACTIONS_QUERY } from '@/constants/graphql/budget'
export default {
  apollo: {
    transactions: {
      query: GET_TRANSACTIONS_QUERY,
      update: (data) => data.getTransactions,
    }
  },
  computed: {
    sortedTransactions () {
      // eslint-disable-next-line
      return this.transactions.slice(0).sort((a,b) => { return Date.parse(b.purchasedOn)-Date.parse(a.purchasedOn)})
    }
  },
  data () {
    return {
      transactions: []
    }
  }
}
</script>
