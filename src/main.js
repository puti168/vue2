import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'
import '@/styles/index.scss' // global css
import { parseTime } from '@/utils/index'
import store from './store'
import i18n from './utils/lang'
import '@/icons' // icon
import '@/permission' // permission control
import apiInstall from '@/utils/apiInstall'
import { hasPermission } from '@/mixins/methods'
import Viewer from 'v-viewer'
import VueClipboard from 'vue-clipboard2' // 引入复制到剪切板插件
import 'viewerjs/dist/viewer.css'
import { supportBrower } from './utils/judgeBrower'
import App from './App'
import router from './router'
supportBrower()

Vue.use(VueClipboard) // 挂载复制到剪切板插件

Vue.use(Viewer)
Vue.use(VueLazyload, {
	preLoad: 1,
	attempt: 1
})

Viewer.setDefaults({
	// inline: true,
	// button: true,
	// navbar: true,
	// title: true,
	toolbar: true,
	// tooltip: false,
	// movable: true,
	// zoomable: true,
	// rotatable: true,
	// scalable: true,
	// transition: true,
	// fullscreen: false,
	// keyboard: true,
	url: 'data-source'
})

Vue.directive('filterSpecialChar', {
	update: function(el, { value, modifiers }, vnode) {
		try {
			if (!el.value) {
				return false
			}
			el.value = el.value.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '')
			el.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
		} catch (e) {
			console.log(e)
		}
	}
})

// 多语言支持
Vue.use(ElementUI, {
	i18n: (key, value) => i18n.t(key, value)
})

// 时间格式化
Vue.filter('dateformat', parseTime)

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
