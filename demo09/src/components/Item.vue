<template lang="html">
  <li @mouseover="addStyle(true)" @mouseout="addStyle(false)" :style="bgColor">
    <label>
      <input type="checkbox" v-model='todo.complete'/>
      <span>{{ todo.content }}</span>
    </label>
    <button class="btn btn-danger" :style="btnShow">删除</button>
  </li>
</template>

<script>
export default {
  props:{
    todo:Object,
    index:Number
  },
  data(){
    return {
      bgColor:{
        background:'#fff'
      },
      btnShow:{
        display:'none'
      }
    }
  },
  methods:{
    addStyle(is){
      if(is){
        this.bgColor.background = '#ccc'
        this.btnShow.display = 'block'
      }else{
        this.bgColor.background = '#fff'
        this.btnShow.display = 'none'
      }
    }
  }
}
</script>

<style lang="css">
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

</style>
