import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios';
import routers from './router/router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css';
import store from './store/index.js'
import qs from "qs";

//调试模式
Vue.config.devtools = true;

const instance = axios.create({
  timeout:'5000',
  headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
  // baseURL: 'http://lease.loverqi.cn:8080',
});

//POST传参序列化(添加请求拦截器)
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    // config.data.token = sessionStorage.token;//向请求data中增加token
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      // 序列化
      config.data = qs.stringify(config.data);
    }
    if (sessionStorage.token){
      config.headers['token'] = sessionStorage.token;
    }
    return config;
  },
  error => {}
);

Vue.prototype.$http = instance;
Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
  mode: 'history',//去除#，形成单页面
  base: __dirname,
  routes: routers
});


const app = new Vue({
  el: '#app',
  router:router,
  store,
  render: h => h(App)
});
