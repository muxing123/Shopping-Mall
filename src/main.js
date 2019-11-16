import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./http/api";
import axios from "axios";
import dayjs from "dayjs";
import city from "./http/city";
import area from "./http/area";
import FastClick from "fastclick";
import Vant from "vant";
import "vant/lib/index.css";

Vue.prototype.$api = api;
Vue.prototype.$axios = axios;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$city = city;
Vue.prototype.$area = area;
Vue.config.productionTip = false;
FastClick.attach(document.body);
Vue.use(Vant);

// 响应拦截
// axios.defaults.timeout = 10000; // 设置超时时间
// // 过滤请求结果 只返回结果的data
// axios.interceptors.response.use(
//   response => {
//     return response.data;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
