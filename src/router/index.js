import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
export default new VueRouter({
    routes:[
        { path: '/', redirect: '/login' }, // 若路径为/，则重定位到/login
        {
            path: '/login',
            component: Login
        },
    ]
})