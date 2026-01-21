// Main entry point for the Vue application
import Vue from 'vue';
import App from './App.vue';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';

// Import BootstrapVue CSS
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Import BootstrapVue library
import BootstrapVue from 'bootstrap-vue';

// Register BootstrapVue as a global plugin
// This makes all BootstrapVue components available throughout the app
Vue.use(BootstrapVue);

// Disable Vue production tip in console
Vue.config.productionTip = false;

// Create and mount the root Vue instance
new Vue({
  render: function(createElement) {
    return createElement(App);
  }
}).$mount('#app');
