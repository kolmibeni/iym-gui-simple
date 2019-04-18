import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

Vue.prototype.$webServeUrl = '140.116.234.166:22005'

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
