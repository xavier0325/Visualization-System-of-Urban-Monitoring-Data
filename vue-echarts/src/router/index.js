import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
	  redirect: '/tranmap'
    },
	{
		path: '/tranmap',
		component: resolve => require(['../components/Layout.vue'],resolve),
		// component: Layout,
		children: [
			{
				path: '/tranmap',
				component: resolve => require(['../components/bmap/tranmap.vue'],resolve)
			},
			{
				path: '/hostmap',
				component: resolve => require(['../components/echarts/hostMap.vue'],resolve)
			},
			{
				path: '/aqi',
				component: resolve => require(['../components/echarts/aqi.vue'],resolve)
			},
			{
				path: '/energy',
				component: resolve => require(['../components/echarts/energy.vue'],resolve)
			},
			{
				path: '/projectmap',
				component: resolve => require(['../components/bmap/projectmap.vue'],resolve)
			},
			{
				path: '/realtimemonitoring',
				component: resolve => require(['../components/echarts/realTimeMonitoring.vue'],resolve)
			},
		]
	}
  ],
  mode: 'history'
})
