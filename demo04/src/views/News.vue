<template lang="html">
  <ul class="list-group">
    <li v-for="item in items" class="list-group-item">{{ item }}</li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      items: [
        'news01', 'news01', 'news03'
      ]
    }
  }
}
</script>
