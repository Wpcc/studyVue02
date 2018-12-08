<template>
  <div id="app">
    {{ msg }}
  </div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        msg: this.$store.state.msg
      }
    }
  }
</script>
