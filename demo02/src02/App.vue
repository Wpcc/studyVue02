<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <Header @addTodo = 'addTodo'/>
        <List :todos='todos'/>
        <Footer :todos='todos' @selectAll='selectAll' @deleteSelected='deleteSelected'/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import List from './components/List.vue'
import Footer from './components/Footer.vue'
import storageUtil from './util/storageUtil'

export default {
  data () {
    return {
      todos: storageUtil.readTodos()
    }
  },
  components: {
    Header,
    List,
    Footer
  },
  methods: {
    addTodo (val){
      this.todos.unshift(val)
    },
    deleteSelected () {
      this.todos = this.todos.filter(item => item.complete === false)
    },
    selectAll (val) {
      // 由于数组中的数据为对象，故能够通过forEach直接修改其中的值
      this.todos.forEach(item => item.complete = val)
    }
  },
  watch: {
    todos: {
      handler: storageUtil.writeTodos,
      deep: true
    }
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
