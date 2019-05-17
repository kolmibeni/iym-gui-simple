import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

// change the URL according to the URL of the web server
// for example, if the web server is deployed in the same machine, change to localhost
// Vue.prototype.$webServeUrl = '140.116.234.166:22005'
Vue.prototype.$webServeUrl = 'localhost:80'

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
