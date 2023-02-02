import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import router from './router'
import './plugins/element'
import api from './api/ajax/api'
import './assets/css/global.css'
// 引入字体库
import './assets/font/iconfont.css'
Vue.config.productionTip = false

// 应用vue-router
Vue.use(VueRouter)
Vue.prototype.$http = api

new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router
}).$mount('#app')
