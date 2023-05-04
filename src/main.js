import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
import axios from 'axios'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/base.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/css/Home.css'
import './assets/css/log-reg.css'


axios.defaults.baseURL = "https://64070w572c.goho.co";
// axios.defaults.baseURL="http://localhost";
// axios默认不携带请求标头 请求时需要设置携带cookie以便后端身份验证
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config=>{
  config.headers.Authorization=window.localStorage.getItem('token')
  return config
})

Vue.prototype.$http = axios
Vue.prototype.$store = store

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  template: `<App></App>`,
  render: h => h(App),
  store,
  router,
}).$mount('#app')