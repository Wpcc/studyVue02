export default {
  state: {
    content: []
  },
  mutations: {
    change(state, msg) {
      console.log(11)
      state.content.push(msg)
    }
  },
  actions: {
    change({ commit }, msg) {
      commit('change', msg)
    }
  }
}
