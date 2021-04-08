import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import userpage from '@/components/userpage'
import editarticle from '@/components/editarticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {      
      path: '/UserPage',
      name: 'UserPage',
      component: userpage

    },
    {      
      path: '/EditArticle',
      name: 'EditArticle',
      component: editarticle

    }
  ]
})
