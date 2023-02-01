import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import Welcome from '../pages/Welcome.vue'
import Swiper from '../pages/home_page/Swiper.vue'
import IndexConfig from '../pages/home_page/IndexConfig.vue'
import Category from '../pages/module/Category.vue'
import Good from '../pages/module/Good.vue'
import AddGood from '../pages/module/AddGood.vue'
import Guest from '../pages/module/Guest.vue'
import Order from '../pages/module/Order.vue'
import OrderDetail from '../pages/module/OrderDetail.vue'

const router = new VueRouter({
    routes:[
        { path: '/', redirect: '/login' }, // 若路径为/，则重定位到/login
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                {
                    path: '/welcome',
                    component: Welcome
                },
                {
                    path: '/swiper',
                    component: Swiper
                },
                {
                    path: '/hot',
                    name: 'hot',
                    component: IndexConfig
                },
                {
                    path: '/new',
                    name: 'new',
                    component: IndexConfig
                },
                {
                    path: '/recommend',
                    name: 'recommend',
                    component: IndexConfig
                },
                {
                    path: '/category',
                    name: 'category',
                    component: Category,
                    children: [
                        {
                            path:'/category/level2',
                            name: 'level2',
                            component: Category
                        },
                        {
                            path:'/category/level3',
                            name: 'level3',
                            component: Category
                        },
                    ]
                },
                {
                    path: '/good',
                    component: Good
                },
                {
                    path: '/add',
                    component: AddGood
                },
                {
                    path: '/guest',
                    component: Guest
                },
                {
                    path: '/order',
                    component: Order,
                },
                {
                    path: '/order_detail',
                    component: OrderDetail
                }
            ]
        },
    ]
})
// 定义全局前置路由守卫
router.beforeEach((to, from, next) =>{
    // 若用户访问的是login页，直接放行
    if(to.path === '/login') {
        next()
    }
    // 从sessionStorage中获取到保存的token值
    const tokenStr = window.sessionStorage.getItem('token');
    // 没有token强制跳转到登录页
    if (!tokenStr) return next('/login');
    next()
})
export default router