import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.min.css'
import store from '@/store/index.js'
import router from '@/store/router.js'

Vue.config.productionTip = false

new Vue({
  store,
  router: router,
  render: h => h(App),
}).$mount('#app')
