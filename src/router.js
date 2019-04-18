import Vue from 'vue'
import Router from 'vue-router'

import IYMIndex from '@/views/iym-index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // routes for IYM
    {
      path: '/',
      component: IYMIndex,
      meta: {
        title: 'IYM'
      }
    },
    {
      path: '/IYM',
      component: IYMIndex,
      meta: {
        title: 'IYM'
      }
    },
    // 20190411 Route for simple KSA result
    {
      path: '/IYM/result/',
      name: 'ksaResult2019',
      component: () => import(/* webpackChunkName: "about" */ '@/views/iym-result.vue'),
      meta: {
        title: 'IYM Result'
      }
    }
  ]
})
