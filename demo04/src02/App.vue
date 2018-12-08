<template>
  <div id="app">
    <button @click='change'>change</button>
    <h3>{{ msg }}</h3>
  </div>
</template>
<script type="text/javascript">
// 如果将vuex中的数据存储到 data中 需要通过深检测才能监测到 vuex中数据的改变 这是由于 this.$store.state是一个对象
  export default {
    data () {
      return {
        msg: ''
      }
    },
    methods: {
      change(){
        this.$store.commit('change')
      }
    },
    watch: {
      '$store.state': {
        handler: function(newVal){
          this.msg = newVal
          console.log(newVal)
        },
        deep: true
      }
    }
  }
</script>
