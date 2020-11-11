<template>
  <div id="app">
    <p v-for="(item,index) in content" :key="index">
      {{ item.name }}
    </p>
    <button @click="changeContent">change</button>
    <button @click="changeContentAsync">changeAsync</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['content'])
  },
  methods: {
    ...mapMutations(['change']),
    ...mapActions({
      changeAsync: 'change'
    }),
    changeContent() { // 使用的是mutations方法
      const _this = this
      setTimeout(function() {
        _this.change({
          name: 'zhangsan',
          age: 14
        })
      }, 1000)
    },
    changeContentAsync() { // 使用的还actions方法
      const _this = this
      setTimeout(function() {
        _this.changeAsync({
          name: 'lisi',
          age: 15
        })
      }, 1000)
    }
  }
}
</script>

<style>
</style>
