// 错误上报 前端错误分为JS运行时错误、资源加载错误和接口错误三种。
import { getUserInfo } from './auth'
import Finger from '@/utils/fingerprintjs2'
import Logan from 'logan-web'

class ErrReport {
	constructor(options) {
		this.options = options
	}

	handleErrReport() {
		// js运行时错误
		this.handleWindowError()

		this.handleRejectPromise()

		this.handleResourceError()

		this.handleConsoleError()

		this.handleAjaxError()
		// vue 组件报错
		if (this.options.vue) {
			let componentName, propsData
			this.options.vue.config.errorHandler = async (err, vm, info) => {
				if (vm) {
					componentName = this.formatComponentName(vm)
					propsData = vm.$options.name
				}
				this.storeReport(
					{ title: 'vue Error', msg: err, componentName, propsData, info },
					1
				)
				this.report()
			}
		}
	}
	handleWindowError() {
		window.onerror = (msg, url, row, col, error) => {
			if (error && error.stack) {
				this.storeReport({ title: msg, msg: error.stack, url, row, col }, 1)
			} else if (typeof msg === 'string') {
				this.storeReport({ title: msg, url, row, col }, 1)
			}
		}
	}

	handleRejectPromise() {
		window.addEventListener('unhandledrejection', (e) => {
			if (e) {
				const reason = e.reason
				this.storeReport({ title: 'unhandledrejection', msg: reason }, 1)
			}
		})
	}

	handleResourceError() {
		window.addEventListener('error', (e) => {
			if (e) {
				const target = e.target || e.srcElement
				const isElementTarget =
					target instanceof HTMLScriptElement ||
					target instanceof HTMLLinkElement ||
					target instanceof HTMLImageElement
				if (!isElementTarget) return // js error不再处理

				const url = target.src || target.href
				this.storeReport({ title: target.nodeName, msg: url }, 2)
			}
		})
	}

	handleConsoleError() {
		if (!window.console || !window.console.error) return

		const oldConsoleError = window.console.error
		window.console.error = () => {
			this.storeReport(
				{
					title: 'consoleError',
					msg: JSON.stringify(arguments)
				},
				1
			)
			oldConsoleError && oldConsoleError.apply(window, arguments)
		}
	}

	_handleFetchError(_window = window) {
		if (!_window.fetch) return
		const _oldFetch = _window.fetch
		_window.fetch = () => {
			return _oldFetch
				.apply(this, arguments)
				.then((res) => {
					if (!res.ok) {
						// True if status is HTTP 2xx
						this.storeReport({ title: arguments[0], msg: JSON.stringify(res) })
					}
					return res
				})
				.catch((error) => {
					this.storeReport(
						{
							title: arguments[0],
							msg: JSON.stringify({
								message: error.message,
								stack: error.stack
							})
						},
						3
					)
					throw error
				})
		}
	}

	handleAjaxError(_window = window) {
		const _this = this
		const protocol = _window.location.protocol
		if (protocol === 'file:') return

		// 处理fetch
		this._handleFetchError(_window)

		// 处理XMLHttpRequest
		if (!_window.XMLHttpRequest) {
			return
		}
		const xmlhttp = _window.XMLHttpRequest

		const _oldSend = xmlhttp.prototype.send
		const _handleEvent = function(event) {
			if (event && event.currentTarget && event.currentTarget.status !== 200) {
				const targetUrl = event.target.responseURL
				if (targetUrl) {
					_this.storeReport(
						{
							title: event.target.responseURL,
							msg: JSON.stringify({
								response: event.target.response,
								responseURL: event.target.responseURL,
								status: event.target.status,
								statusText: event.target.statusText
							})
						},
						3
					)
				}
			}
		}
		xmlhttp.prototype.send = function() {
			if (this['addEventListener']) {
				this['addEventListener']('error', _handleEvent)
				this['addEventListener']('load', _handleEvent)
				this['addEventListener']('abort', _handleEvent)
			} else {
				const _oldStateChange = this['onreadystatechange']
				this['onreadystatechange'] = function(event) {
					if (this.readyState === 4) {
						_handleEvent(event)
					}
					_oldStateChange && _oldStateChange.apply(this, arguments)
				}
			}
			return _oldSend.apply(this, arguments)
		}
	}

	// 存储错误并上报
	storeReport(content, type = 1) {
		content = content instanceof Object ? JSON.stringify(content) : content
		Logan.log(content, type)
		this.report()
	}

	async report() {
		let date = new Date()
		const y = date.getFullYear()
		let m = date.getMonth() + 1
		if (m < 10) {
			m = '0' + m
		}
		var d = date.getDate()
		if (d < 10) {
			d = '0' + d
		}
		date = y + '-' + m + '-' + d
		const environment = window.navigator.userAgent.toLowerCase()
		const userInfo = getUserInfo() || {}
		if (userInfo.roles) delete userInfo.roles
		await Logan.report({
			reportUrl: 'http://localhost:8081/logan/web/upload.json',
			deviceId: Finger.get(),
			fromDayString: date,
			toDayString: date,
			webSource: this.options.projectName,
			environment,
			customInfo: JSON.stringify({
				userInfo
			})
		})
	}

	formatComponentName(vm) {
		if (vm.$root === vm) return 'root'
		const name = vm._isVue
			? (vm.$options && vm.$options.name) ||
			  (vm.$options && vm.$options._componentTag)
			: vm.name
		return (
			(name ? 'component <' + name + '>' : 'anonymous component') +
			(vm._isVue && vm.$options && vm.$options.__file
				? ' at ' + (vm.$options && vm.$options.__file)
				: '')
		)
	}
}

export default ErrReport
