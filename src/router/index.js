import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'

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