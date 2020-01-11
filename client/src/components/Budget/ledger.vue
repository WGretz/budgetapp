<template>
  <div>
    <form>
      <input type="text" data-cy="transaction-date" v-model="transactionAttributes.purchasedOn" />
      <input type="text" data-cy="transaction-description" v-model="transactionAttributes.description" />
      <input type="text" data-cy="transaction-amount" v-model="amount" />
      <input type="button" value="Create Transaction" data-cy="transaction-submit" @click="createTransaction" />
    </form>
    <table>
      <tr v-for="transaction in sortedTransactions" :key="transaction.id" data-cy="transaction-row">
        <td data-cy="transaction-date">{{ moment(transaction.purchasedOn).format('MM/DD/YYYY') }}</td>
        <td data-cy="transaction-description">{{ transaction.description }}</td>
        <td data-cy="transaction-amount">{{ transaction.amountInCents | toCurrency }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { GET_TRANSACTIONS_QUERY, NEW_TRANSACTION_MUTATION } from '@/constants/graphql/budget'
import moment from 'moment';

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
      transactions: [],
      transactionAttributes: {
        description: '',
        amountInCents: 0,
        purchasedOn: moment().format('MM/DD/YYYY')
      },
      amount: 0,
    }
  },
  methods: {
    createTransaction () {
      this.$apollo.mutate({
        mutation: NEW_TRANSACTION_MUTATION,
        variables: { attributes: this.transactionAttributes },
        update: (cache, { data: { createTransaction } }) => {
          console.log(data)
          const data = cache.readQuery({
            query: GET_TRANSACTIONS_QUERY
          })
          data.getTransactions.splice(0, 0, createTransaction)
          cache.writeQuery({
            query: GET_TRANSACTIONS_QUERY,
            data
          })
        }
      })
    },
    moment
  },
  watch: {
    amount (val) {
      this.transactionAttributes.amountInCents = val * 100
    }
  }
}
</script>
