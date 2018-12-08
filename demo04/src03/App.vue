<template>
  <div id="app">
    <button @click='change'>change</button>
    <h3>{{ msg }}</h3>
  </div>
</template>
<script type="text/javascript">
// vuex中的数据
  export default {
    computed: {
      msg () {
          return this.$store.state.msg
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
