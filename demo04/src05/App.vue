<template>
  <div id="app">
    <p>click {{ count }} times, count is {{ evenOrOdd }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>
<script type="text/javascript">
import { mapState, mapActions, mapGetters } from 'vuex'
// vuex中的数据
export default {
  computed: {
    ...mapState(['count']),
    ...mapGetters(['evenOrOdd'])
  },
  methods: {
    ...mapActions(['increment']),
    ...mapActions(['decrement']),
    ...mapActions(['incrementIfOdd']),
    ...mapActions(['incrementAsync'])
  }
}
</script>
