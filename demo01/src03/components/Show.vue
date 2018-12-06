<template lang="html">
  <div>
    <h1>Show 组件</h1>
    <div>
      {{ msg }}
    </div>
  </div>
</template>

<script>
import Pubsub from 'pubsub-js'
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {

  },
  mounted () {
    Pubsub.subscribe('myTopic', (msg, data) => {
      this.msg = data
    })
  }
}
</script>

<style lang="css">
</style>
