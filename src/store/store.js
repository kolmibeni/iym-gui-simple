import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navTitle: ''
  },

  getters: {},

  actions: {},

  mutations: {
    setNavTitle (state, title) {
      state.navTitle = title
    }
  }
})
