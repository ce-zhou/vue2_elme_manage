import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import router from './router'
import './plugins/element'
import axios from 'axios'
import './assets/css/global.css'
Vue.config.productionTip = false

// 应用vue-router
Vue.use(VueRouter)

// 配置请求根路径
axios.defaults.baseURL = 'http://backend-api-02.newbee.ltd/manage-api/v1'
Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
