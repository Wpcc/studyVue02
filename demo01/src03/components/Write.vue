<template lang="html">
  <div class="">
    <h1>write 组件</h1>
    <label>
      <input type="text" v-model="content">
      <input type="button" value="提交" @click='submit'>
    </label>
  </div>
</template>

<script>
import Pubsub from 'pubsub-js'
export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    submit () {
      Pubsub.publish('myTopic', this.content)
    }
  }
}
</script>

<style lang="css">
</style>
