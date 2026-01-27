import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

// BootstrapVue (Vue 2)
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vuelidate (Vue 2)
import Vuelidate from 'vuelidate'

Vue.use(BootstrapVue)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
