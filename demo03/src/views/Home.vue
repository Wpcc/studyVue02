<template>
  <div class="home">
    <h1>home 组件</h1>
    <ul class="nav nav-tabs">
      <li role="presentation"><router-link to="/home/news">News</router-link></li>
      <li role="presentation"><router-link to="/home/message">Message</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>
