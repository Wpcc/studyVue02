import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    content: []
  },
  mutations: {
    change(state, msg) {
      state.content.push(msg)
    }
  },
  actions: {
    change({ commit }, msg) {
      commit('change', msg)
    }
  }
})
