import Vue from 'vue'
import App from './App.vue'
import vueRouter from "vue-router"
import router from './router'
import './plugins/element'
import axios from 'axios'
Vue.config.productionTip = false

// 应用vue-router
Vue.use(vueRouter)

// 配置请求根路径
axios.defaults.baseURL = 'https://elm.cangdu.org'
Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
