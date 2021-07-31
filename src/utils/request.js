import axios from 'axios'
import Finger from '@/utils/fingerprintjs2'
import md5 from 'js-md5'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// import Cookies from 'js-cookie'
import { getToken } from '@/utils/auth'
import encrypt from './encrypt'

Finger.load()

// create an axios instance
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url url:'http://47.75.164.135:8102'
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 15000 // request timeout
})
// request interceptor
service.interceptors.request.use(
	(config) => {
		if (config.params) {
			const keys = Object.keys(config.params)
			keys.forEach((element) => {
				if (
					config.params[element] === '' ||
					config.params[element] === '-1' ||
					config.params[element] === -1
				) {
					config.params[element] = undefined
				}
			})
		}
		// do something before request is sent
		if (store.getters.token) {
			// let each request carry token
			// ['X-Token'] is a custom headers key
			// please modify it according to the actual situation
			config.headers['X-Request-Token'] = getToken()
			config.headers['X-Request-Sys'] = 1
			config.headers['Content-Type'] = 'application/json;charset=UTF-8'
		}
		config.headers['key_param'] =
			process.env.VUE_APP_KEY_ID + '|platform|application|v0.9.0'
		// get请求是否加密开关
		if (config.method === 'get') {
			const nonce = Math.round(Math.random() * Math.pow(2, 63)) + ''
			const timestamp = new Date().getTime() + ''
			const sign = md5(Finger.get() + nonce + timestamp)
			config.headers['ob-nonce'] = nonce
			config.headers['ob-timestamp'] = timestamp
			config.headers['ob-sign'] = sign
			config.headers['X-Request-Browser'] = Finger.get()
			// config.headers['zr-encrypted'] = true
			// if (config.data && !config.data.append) {
			//     return encrypt.encryptData(config)
			// }
		} else {
			const nonce = Math.round(Math.random() * Math.pow(2, 63)) + ''
			const timestamp = new Date().getTime() + ''
			const sign = md5(Finger.get() + nonce + timestamp)
			// console.log('nonce, timestamp:', nonce, timestamp)
			config.onUploadProgress = (progressEvent) => {
				const complete =
					((progressEvent.loaded / progressEvent.total) * 100) | 0
				if (config.cb) {
					config.cb(complete)
				}
			}
			config.headers['ob-nonce'] = nonce
			config.headers['ob-timestamp'] = timestamp
			config.headers['ob-sign'] = sign
			config.headers['X-Request-Browser'] = Finger.get()
			// config.headers['zr-encrypted'] = false
		}
		return config
	},
	(error) => {
		// do something with request error
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	async (response) => {
		if (
			response.config.responseType &&
			response.config.responseType === 'blob'
		) {
			return response
		}
		const headers = response.config.headers
		// 数据解密, 只对content-type为application/json或者text/plain解密
		const headersContentType = response.headers['content-type'] || ''
		if (
			headers['zr-encrypted'] &&
			response.data &&
			(headersContentType.includes('application/json') ||
				headersContentType.includes('text/plain'))
		) {
			const decryptData = encrypt.decryptData(response.data) || ''
			response.data = JSON.parse(decryptData)
		}
		const res = response.data
		if (res.code !== 200) {
			if (res.code === 10025) {
				const username = localStorage.getItem('username')
				const password = localStorage.getItem('password')
				const googleAuth = localStorage.getItem('googleAuth')
				await store
					.dispatch('user/login', {
						username: username.trim(),
						password,
						googleAuth,
						version: '2.0',
						pwdNeedReset: true,
						prePassword: password
					})
					.then(() => {
						router.push(`/`)
					})
					.catch(() => {})
			} else {
				// if the custom code is not 20000, it is judged as an error.
				if (res.code === 20000 || res.code === 20001 || res.code === 20002) {
					// 无效权限
					const fullPath = router.history.current.fullPath
					await store.dispatch('user/logout')
					await store.dispatch('permission/clearRoutes')
					router.push(`/login?redirect=${fullPath}`)
				}
				Message.closeAll()
				Message({
					message: res.message || res.msg || res || 'Error',
					type: 'error'
				})
			}
			return Promise.reject(new Error(res.message || res.msg || 'Error'))
		} else {
			return res
		}
	},
	async (error) => {
		// 重新赋值超时提示
		if (error.message && error.message.includes('timeout')) {
			error.message = '服务器繁忙,请稍后再试'
		}
		// const fullPath = router.history.current.fullPath
		// await store.dispatch('permission/clearRoutes')
		// router.push(`/login?redirect=${fullPath}`)
		Message.closeAll()
		Message({
			message: error.message || error.msg,
			type: 'error'
		})
		return Promise.reject(error)
	}
)

export default service
