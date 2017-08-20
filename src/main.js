import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios';
import routers from './router/router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css';
import store from './store/index'

//调试模式
Vue.config.devtools = true;
//设定请求头
//axios.defaults.baseURL = 'http://api.exmple.com';

Vue.use(VueRouter);
Vue.prototype.$http = axios;
Vue.use(ElementUI);

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
  mode: 'history',//去除#，形成单页面
  base: __dirname,
  routes: routers
})


const app = new Vue({
  el: '#app',
  router:router,
  store,
  render: h => h(App)
})
