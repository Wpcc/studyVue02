import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Message from './views/Message.vue'
import News from './views/News.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {path:'news', component:News},
        {path:'message', component:Message},
        {path:'', redirect:'news'}
      ]
    },
    {
      path: '/about',
      component: About
    }
  ]
})
