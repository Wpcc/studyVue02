import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 其实就是对应着 vue 实例中的数据
    msg: 'hello'
  },
  mutations: {
    // 其实就是对应着 vue 的方法，而且每个特定的方法都会传递一个 state 参数
    change(state) {
      state.msg = 'world'
    }
  }
})
