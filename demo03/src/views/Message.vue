<template lang="html">
  <ul class="list-group">
    <li v-for="item in msgs" class="list-group-item"><a url="">{{ item.content }}</a></li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      msgs: [
        {id:1, content:'message01'},
        {id:2, content:'message02'},
        {id:3, content:'message03'}
      ]
    }
  }
}
</script>
