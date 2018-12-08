<template>
  <div id="app">
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">
          <h2>Router Basic - 01</h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <router-link to="/home" class="list-group-item">Home</router-link>
          <router-link to="/About" class="list-group-item">About</router-link>
        </div>
      </div>
      <div class="col-xs-6 col-xs-offset-2">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style lang='css'>
.list-group-item:hover {
  cursor: pointer;
}
</style>
