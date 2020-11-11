<template>
  <div id="app">
    {{ msg }}
  </div>
</template>
<script type="text/javascript">
export default {
  computed: {
    msg() {
      return this.$store.state.msg
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log('hello')
  }
}
</script>
