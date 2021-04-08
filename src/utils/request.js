import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import Cookies from 'js-cookie'
import Finger from '@/utils/fingerprintjs2'

Finger.load()
/*

		header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
		header('Access-Control-Allow-Methods: GET, POST, PUT,DELETE');
*/
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API, // url = base url + request urlß
	// baseURL: '',
	// withCredentials: true, // 请求头携带cookie,需要后端开启跨域资源共享
	timeout: 1000 * 60 * 60 * 24 // request timeout
})

// request interceptor
service.interceptors.request.use(
	(config) => {
		// before the request ,we should add the hh:mm:ss
		if (config.params) {
			const { params } = config
			const keys = Object.keys(params)
			keys.forEach((element) => {
				if (
					config.params[element] === '' ||
					config.params[element] === '-1' ||
					config.params[element] === -1
				) {
					config.params[element] = undefined
				}
			})
			config = filterTimeScope('createStart', 'createEnd', config)
			// config = filterTimeScope('startTime', 'endTime', config)
			// config = filterTimeScope('startDate', 'endDate', config)
			config = filterTimeScope('logoutStart', 'logoutEnd', config)
		}

		if (store.getters.token) {
			// config.headers['X-Request-Token'] = getToken()
			// config.headers['X-Request-Sys'] = 3
		}

		// config.headers['lang'] =
		// 	Cookies.get('language') === 'zh'
		// 		? 'zh_CN'
		// 		: Cookies.get('language') === 'en'
		// 		? 'en_US'
		// 		: ''

		// config.headers['X-Request-Browser'] = Finger.get()

		// if (
		// 	process.env.NODE_ENV !== 'development' &&
		// 	process.env.NODE_ENV !== 'test'
		// ) {
		// 	config.headers['zr-encrypted'] = true
		// 	if (config.data && !config.data.append) {
		// 		return encrypt.encryptData(config)
		// 	}
		// }
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	(response) => {
		// const headers = response.config.headers
		// 数据解密, 只对content-type为application/json或者text/plain解密
		// const headersContentType = response.headers['content-type'] || ''
		// if (
		// 	headers['zr-encrypted'] &&
		// 	response.data &&
		// 	(headersContentType.includes('application/json') ||
		// 		headersContentType.includes('text/plain'))
		// ) {
		// 	const decryptData = encrypt.decryptData(response.data) || ''
		// 	response.data = JSON.parse(decryptData)
		// }
		const res = response.data
		if (res.code !== 200) {
			if ([20000, 20001, 20002].includes(res.code)) {
				sleep(1200, async () => {
					await store.dispatch('user/logout')
					await store.dispatch('user/resetToken')
					await store.dispatch('permission/clearRoutes')
					router.push(`/login`)
				})
			}
			createMsg(res.msg || res.message || 'Error')
			return Promise.reject(new Error(res.message || res.msg || 'Error'))
		} else {
			return res
		}
	},
	(error) => {
		if (error.message && error.message.includes('timeout')) {
			const chooseLanguage = Cookies.get('language')
			switch (chooseLanguage) {
				case 'en':
					error.message = 'The server is busy, please try again later'
					break
				case 'tw':
					error.message = '服務器繁忙,請稍後再試'
					break
				default:
					error.message = '服务器繁忙,请稍后再试'
			}
		}

		createMsg(error.message || '')

		return Promise.reject(error)
	}
)

function filterTimeScope(start, end, config) {
	const timestamp = 24 * 60 * 60 * 1000 - 1
	const { params } = config
	if (params[start] && params[end] && params[end] === params[start]) {
		config.params[end] = +config.params[end] + timestamp
	}
	return config
}

function sleep(time, callback) {
	clearTimeout(window.timer)
	window.timer = null
	window.timer = setTimeout(() => {
		callback && callback()
	}, time)
}

function createMsg(msg) {
	if (window.msgInstance) {
		Message.closeAll()
		window.msgInstance = undefined
	}

	window.msgInstance = Message({
		message: msg,
		type: 'error'
	})

	return window.msgInstance
}

export default service
