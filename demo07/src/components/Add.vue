<template lang="html">
<div class="col-md-4">
  <form class="form-horizontal">
    <div class="form-group">
      <label>用户名</label>
      <input type="text" class="form-control" placeholder="用户名" v-model='name'>
    </div>
    <div class="form-group">
      <label>评论内容</label>
      <textarea class="form-control" rows="6" placeholder="评论内容" v-model='content'></textarea>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="button" class="btn btn-default pull-right" @click='handleAdd'>提交</button>
      </div>
    </div>
  </form>
</div>
</template>

<script>
export default {
  data(){
    return {
      name:'',
      content:''
    }
  },
  methods:{
    handleAdd(){
      // 1.检验数据
      var name = this.name.trim();
      var content = this.content.trim();
      if(!name || !content){
        alert('请输入姓名或留言');
        return
      }
      //2.插入数据
      var comment = {name:name, content:content};
      this.$emit('add',comment)
      //3.清空数据
      name = '';
      content = '';
    }
  }
}
</script>

<style lang="css">
</style>
