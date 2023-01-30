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
// 请求头，headers 信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 通过axios请求拦截器添加token
axios.interceptors.request.use((config) => {
  config.headers['token'] = window.sessionStorage.getItem("token");
  return config;
});

new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router
}).$mount('#app')
