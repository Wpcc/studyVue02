import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'

// 没有使用命名空间的modules，其实是将其余模块的 states，mutations，actions，getters拼接在一起
// 唯一不同的就是，在state拿取值得时候，需要加模块名，方法不需要

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  getters
})

