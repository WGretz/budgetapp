<template>
  <div>
    <table>
      <tr>
        <th>Purchased On</th>
        <th>Account</th>
        <th>Name</th>
        <th>Amount</th>
        <th></th>
      </tr>
      <tr>
        <td>
          <v-text-field
            label="Purchased On"
            type="date"
            data-cy="transaction-date"
            v-model="transactionAttributes.purchasedOn"
          />
        </td>
        <td>
          <v-select
            :items="accounts"
            item-text="name"
            item-value="id"
            id="transaction-acct"
            v-model="transactionAttributes.accountId"
          />
        </td>
        <td>
          <v-text-field
            label="Description"
            placeholder="Chevron"
            data-cy="transaction-description"
            v-model="transactionAttributes.description"
          />
        </td>
        <td>
          <v-text-field
            label="Price"
            placeholder="-6.90"
            data-cy="transaction-amount"
            v-model="amount"
          />
        </td>
        <td>
          <input type="button" value="Create Transaction" data-cy="transaction-submit" @click="createTransaction" />
        </td>
      </tr>
      <tr v-for="transaction in sortedTransactions" :key="transaction.id" :data-cy='"transaction-row"+transaction.id'>
        <td data-cy="transaction-date">{{ moment(transaction.purchasedOn).format('MM/DD/YYYY') }}</td>
        <td data-cy="transaction-account">{{ accountName(transaction.accountId) }}</td>
        <td data-cy="transaction-description">{{ transaction.description }}</td>
        <td data-cy="transaction-amount">{{ transaction.amountInCents | toCurrency }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { GET_TRANSACTIONS_QUERY, NEW_TRANSACTION_MUTATION, GET_ACCOUNTS_QUERY } from '@/constants/graphql/budget'
import moment from 'moment';

export default {
  apollo: {
    transactions: {
      query: GET_TRANSACTIONS_QUERY,
      update: (data) => data.getTransactions,
    },
    accounts: {
      query: GET_ACCOUNTS_QUERY,
      update: (data) => data.getAccounts,
    },
  },
  computed: {
    sortedTransactions () {
      // eslint-disable-next-line
      return this.transactions.sort((a,b) => { return Date.parse(b.purchasedOn)-Date.parse(a.purchasedOn)})
    }
  },
  data () {
    return {
      transactions: [],
      accounts: [],
      transactionAttributes: {
        description: '',
        amountInCents: 0,
        purchasedOn: moment().format('YYYY-MM-DD')
      },
      amount: 0,
    }
  },
  methods: {
    accountName (id) {
      let account = this.accounts.find((item) => {
        return item.id == id
      })
      return account ? account.name : "N/A"
    },
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
