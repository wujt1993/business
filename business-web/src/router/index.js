import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      meta: {title: '首页', isNav: true, icon: 'user-icon'},
      component: () => import('@/views/Index')
    },
    {
      path: '/info',
      meta: {title: '详情', isNav: true, icon: 'user-icon'},
      component: () => import('@/views/Info')
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
export default router
