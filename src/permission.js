import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import axios from 'axios'
import Cookies from 'js-cookie'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

const checkVersion = (to, from, next) => {
	const VERSION = Cookies.get('version') || ''
	axios
		.get(`../static/version.json?_=${Math.random()}`)
		.then((response) => {
			// 访问前端服务器获取版本号
			if (response.status === 200 && response.data.version) {
				if (VERSION === '') {
					Cookies.set('version', response.data.version)
				} else if (VERSION !== response.data.version) {
					Cookies.set('version', response.data.version)
					console.info('新版本：', response.data.version)
					setTimeout(() => {
						location.reload(true)
					}, 0)
					return
				}
			}
			ifVersionCorrect(to, from, next)
		})
		.catch((err) => {
			console.error('checkVersion', err)
			ifVersionCorrect(to, from, next)
		})
}

const ifVersionCorrect = async (to, from, next) => {
	NProgress.start()
	document.title = getPageTitle(to.meta.title)
	const hasToken = getToken()
	const addRoutes = store.state.permission.addRoutes
	if (hasToken) {
		if (to.path === '/login') {
			next({ path: '/' })
			NProgress.done()
		} else {
			if (!addRoutes.length) {
				const roles = await store.dispatch('user/getRoles')
				console.log('roles', roles)
				try {
					if (roles === '无效权限') {
						await store.dispatch('user/resetToken')
						next(`/login?redirect=nopermission`)
						NProgress.done()
					} else {
						const accessRoutes = await store.dispatch(
							'permission/generateRoutes',
							roles
						)
						console.log('accessRoutes', accessRoutes)
						router.addRoutes(accessRoutes)
						next({ ...to, replace: true })
					}
				} catch (e) {
					Message.error(e || 'roles获取失败')
				}
			} else {
				try {
					// await store.dispatch('user/getInfo')
					next()
				} catch (error) {
					await store.dispatch('user/resetToken')
					Message.error(error || 'Has Error')
					next(`/login?redirect=${to.path}`)
					NProgress.done()
				}
			}
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next(`/login?redirect=${to.path}`)
			NProgress.done()
		}
	}
}

router.beforeEach(async (to, from, next) => {
	if (
		process.env.NODE_ENV === 'development' ||
		process.env.NODE_ENV === 'test'
	) {
		ifVersionCorrect(to, from, next)
	} else {
		// 检测版本
		checkVersion(to, from, next)
	}
})
router.afterEach(() => {
	NProgress.done()
})