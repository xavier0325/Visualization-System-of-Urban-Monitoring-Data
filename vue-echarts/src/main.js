import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import * as echarts from 'echarts'

Vue.prototype.$http = axios	//挂在vue的原型链上配置全局axios
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
