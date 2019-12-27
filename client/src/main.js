import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createProvider } from './vue-apollo'
import filters from '@/utils/filters'

Vue.config.productionTip = false

Vue.filter('budgetToCurrency', filters.budgetToCurrency)

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
