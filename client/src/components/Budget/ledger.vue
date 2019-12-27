<template>
  <div>
    <table>
      <tr v-for="transaction in transactions" :key="transaction.id">
        <td>{{ transaction.description }}</td>
        <td>{{ transaction.amountInCents | budgetToCurrency }}</td>
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
  data () {
    return {
      transactions: []
    }
  }
}
</script>
