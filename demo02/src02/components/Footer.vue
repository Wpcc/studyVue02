<template lang="html">
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isAllCheck"/>
    </label>
    <span>
      <span>已完成{{ selectTodos.length }}</span> / 全部{{ todos.length }}
    </span>
    <button class="btn btn-danger" v-show="selectTodos.length" @click="$emit('deleteSelected')">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  props:{
    /*
     对传过来的数据做点什么?
     1.显示选择的数量  ==> 需要对数据做处理 ==> computed
     2.显示所有的数量
    */
    todos:Array
  },
  computed:{
    selectTodos(){
      //用ES5中数组filter方法对数据做过滤
      return this.todos.filter(item => item.complete === true)
    },
    isAllCheck:{
      get(){
        return this.selectTodos.length === this.todos.length && this.todos.length != 0
      },
      set(val){
        this.$emit('selectAll',val)
      }
    }
  }
}
</script>

<style lang="css">
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
