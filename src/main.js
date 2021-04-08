import Vue from 'vue'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import i18n from './utils/lang'
import '@/icons' // icon
import '@/permission' // permission control
import apiInstall from '@/utils/apiInstall'
import { hasPermission } from '@/mixins/permission'
// 浏览器不兼容提示下载
import { supportBrower } from './utils/judgeBrower'
// import ErrReport from './utils/errReport'

supportBrower()

// 生产环境才上传
// if (process.env.NODE_ENV !== 'development') {
// 	const errReport = new ErrReport({
// 		vue: Vue,
// 		projectName: '业务监控系统'
// 	})
// 	errReport.handleErrReport()
// }

// 引入echarts
Vue.component('v-chart', ECharts)

// 多语言支持
Vue.use(ElementUI, {
	i18n: (key, value) => i18n.t(key, value)
})

// 加入api插件
Vue.use(apiInstall)

Vue.config.productionTip = false
Vue.mixin({
	methods: {
		hasPermission
	}
})

// 当前环境
Vue.prototype.env = process.env.NODE_ENV === 'development' ? 'dev' : 'prd'

new Vue({
	el: '#app',
	i18n,
	router,
	store,
	render: (h) => h(App)
})
