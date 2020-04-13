import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [{
    path:'/',
    redirect:'/index'
  },{
    path:'/index',
    component:resolve=>require(['../components/layout/Container.vue'],resolve),
    children:[{
      path:'/index',
      component:resolve=>require(['../views/Students.vue'],resolve)
    }]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
/* 登陆注册时使用 */
router.beforeEach((to,from,next)=>{
next()
})
export default router
