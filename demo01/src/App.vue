<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对React的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <Add @add = 'add'/>
      <List :comments="comments" @del='del'/>
    </div>
  </div>
</template>
<script type="text/javascript">
  import Add from './components/Add.vue'
  import List from './components/List.vue'
  export default{
    data(){
      return {
        comments:[
          {name:'小明',content:'我是小明'},
          {name:'小白',content:'我是小白'},
          {name:'小李',content:'我是小李'}
        ]
      }
    },
    components:{
      Add,
      List
    },
    methods:{
      add(comment){
        this.comments.unshift(comment)
      },
      del(index){
        this.comments.splice(index, 1)
      }
    }
  }
</script>
<style lang="less">

</style>
