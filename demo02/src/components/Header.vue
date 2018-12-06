<template lang="html">
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" @keyup.enter='handleAdd' v-model='content'/>
  </div>
</template>

<script>
export default {
  data(){
    return {
      content:''
    }
  },
  methods:{
    handleAdd(){
      //1.检验数据
      var content = this.content.trim()
      if(!content){
        alert('输入的数据不能为空')
        return
      }
      //2.处理数据
      var todo = {complete:false, content}
      //3.提交数据
      this.$emit('addTodo',todo)
      //4.初始化数据
      content = ''
    }
  }
}
</script>

<style lang="css">
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
