// ============================================
// MAIN ENTRY POINT - main.js
// This file initializes the Vue application
// ============================================

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Disable production tip in console
Vue.config.productionTip = false

// Create and mount the Vue application
new Vue({
  // Inject the router into the app
  router,
  // Inject the Vuex store into the app
  store,
  // Render the root App component
  render: h => h(App)
}).$mount('#app')
