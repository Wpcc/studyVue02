import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 其实就是对应着 vue 实例中的数据
    count: 0
  },
  mutations: {
    // 其实就是对应着 vue 的方法，而且每个特定的方法都会传递一个 state 参数
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    }
  },
  actions: {
    // vue 实例中方法的扩展，这是由于 mutations 不支持异步操作
    increment(state) { // 此处利用ES6的语法对对象进行解构  实际传入的是context对象，该对象有store的所有方法和属性
      state.commit('increment')
    },
    decrement(state) {
      state.commit('decrement')
    },
    incrementIfOdd({ commit, state }) {
      if (state.count % 2 === 0) {
        commit('increment')
      }
    },
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 100)
    }
  },
  getters: {
    // 对应 vue 实例的计算属性
    evenOrOdd(state) {
      return state.count % 2 === 0 ? '偶数' : '奇数'
    }
  }
})
