import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import Search from '@/views/search/index.vue'
import SearchList from '@/views/search/list.vue'
import ProDetail from '@/views/prodetail/index.vue'
import Pay from '@/views/pay/index.vue'
import MyOrder from '@/views/myorder/index.vue'
import Home from '@/views/layout/home.vue'
import User from '@/views/layout/user.vue'
import Cart from '@/views/layout/cart.vue'
import Category from '@/views/layout/category.vue'
import store from '@/store'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/user', component: User },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart }
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    // 动态路由传参，确认将来时那个商品，路由参数中携带id
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: MyOrder }
  ]
})
// 页面拦截
// to:到哪里去，到哪里去的完整路由信息对象(路径，参数)
// from:从哪来，从哪来的完整路由信息对象(路径，参数)
// next():是否放行
// (1) next()直接放行，放行到to要去的路径
// (2) next(路径) 进行拦截，拦截到nxet里面配置的路径
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // ...
  // 返回 false 以取消导航
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.token
  console.log(token)
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
