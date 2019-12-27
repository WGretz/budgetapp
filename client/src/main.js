import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createProvider } from './vue-apollo'
import filters from '@/utils/filters'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.filter('budgetToCurrency', filters.budgetToCurrency)

new Vue({
  router,
  apolloProvider: createProvider(),
  vuetify,
  render: h => h(App)
}).$mount('#app')
