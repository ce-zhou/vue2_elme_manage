//对axios进行二次封装,导入刚下载好的axios
import axios from "axios";
import { Message } from "element-ui";
import router from "../router/index";

// 根据环境变量进行接口区分
// 由于后端没有区分测试和正式，写成一个接口。
switch (process.env.NOED_ENV) {
  case "production":
    axios.defaults.baseURL = "http://backend-api-02.newbee.ltd/manage-api/v1";
    break;
  case "test":
    axios.defaults.baseURL = "http://backend-api-02.newbee.ltd/manage-api/v1";
    break;
  default:
    axios.defaults.baseURL = "http://backend-api-02.newbee.ltd/manage-api/v1";
}
//设置请求超时时间
axios.defaults.timeout = 5000;
//  cookie校验，因为用的是token校验，所以在这里没有用
axios.defaults.withCredentials = true;
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post["Content-Type"] = "application/json";
// XMLHttpRequest是给服务器用的，用于区别 AJAX 请求(异步)还是普通（同步）的请求（一般指表单提交）的
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";

// 设置请求拦截器
axios.interceptors.request.use(
  (config) => {
    let token = window.sessionStorage.getItem("token");
    token && (config.headers["token"] = token);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 设置响应拦截器

axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    Message({
      message: '服务端异常',
      type: "error",
    });
    return Promise.reject(res)
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) {
      Message({
        message: res.data.message,
        type: "error",
      });
    }
    if (res.data.resultCode == 419) {
      router.push({ path: '/login' })
    }
    return Promise.reject(res.data)
  }
  return res.data
})
export default axios;
