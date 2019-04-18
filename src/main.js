import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueSocketio from 'vue-socket.io'

import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

Vue.use(new VueSocketio({
  debug: true,
  connection: '/localhost:3000'
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
