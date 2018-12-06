<template>
  <div class="app">
    <div v-if="!searchName">
      loading
    </div>
    <div v-else >
      The most starts is <a :href="searchUrl">{{ searchName }}</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      searchUrl: '',
      searchName: ''
    }
  },
  mounted () {
    // ajax 请求
    const url = 'https://api.github.com/search/repositories?q=v&sort=stars'
    axios.get(url).then(
      res => {
        this.searchName = res.data.items[0].name
        this.searchUrl = res.data.items[0].html_url
      }
    )
  }
}
</script>
<style lang='css'>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
