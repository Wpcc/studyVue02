<template>
  <div id="app">
    {{ msg }}
  </div>
</template>
<script type="text/javascript">
  export default {
    computed: {
      msg () {
        return this.$store.state.msg
      }
    },
    mounted () {
      console.log(this.msg)
    }
  }
</script>
