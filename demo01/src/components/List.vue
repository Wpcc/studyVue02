<template lang="html">
  <div class="col-md-8">
    <h3 class="reply">评论回复：</h3>
    <h2 v-show="comments.length === 0">暂无评论，点击左侧添加评论！！！</h2>
    <ul class="list-group">
      <Item v-for="(comment,index) in comments"  :comment="comment" :key='index' :index='index' @del='del'/>
    </ul>
  </div>
</template>

<script>
import Item from './Item.vue'
export default {
  props:['comments'],
  components:{
    // 组件
    Item
  },
  methods:{
    del(index){
      this.$emit('del',index)
    }
  }
}
</script>

<style lang="css">
.reply {
  margin-top: 0px;
}

</style>
