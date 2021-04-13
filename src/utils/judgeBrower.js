export function supportBrower() {
	const ua = window.navigator.userAgent.toLowerCase()

	console.log('ua :', ua)

	// is IE
	if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
		const browserVersion =
			ua.match(/msie ([\d.]+)/) != null
				? ua.match(/msie ([\d.]+)/)[1]
				: ua.match(/rv:([\d.]+)/)[1]

		if (Number(browserVersion) < 11) {
			_handleNotSupportBrower()
		} else {
			_clearEyeInIE()
		}
	}

	// is Edge
	if (ua.match(/edge/) != null) {
		const version = ua.match(/edge\/([\d.]+)/)[1]
		_out({ brower: 'edge', kit: 'edge', version })
		_clearEyeInIE()
		_fixLayoutErrorInEdge()
	}

	// is UC
	if (ua.match(/ubrowser/) != null) {
		_getBrowerAndVersion(ua, 'UC', () => {})
	}

	// is 搜狗
	if (ua.match(/metasr/) != null) {
		_getBrowerAndVersion(ua, '搜狗', () => {
			_clearSafeboxInSougo()
		})
	}

	// is QQ
	if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
		_getBrowerAndVersion(ua, 'QQ', () => {})
	}

	// is 360,360完全伪装,无法判断兼容模式
	if (ua.match(/chrome/) != null) {
		const is360 = _mime('type', 'application/vnd.chromium.remoting-viewer')
		if (is360) {
			_getBrowerAndVersion(ua, '360', () => {
				document.onreadystatechange = () => {
					if (document.readyState === 'complete') {
						const meta = document.createElement('meta')
						const head =
							document.head || document.getElementsByTagName('head')[0]
						meta.name = 'renderer'
						meta.content = 'webkit'
						head.appendChild(meta)
					}
				}
			})
		}
	}
}

/**
 * 获取浏览器内核和当前版本
 * @param {*} ua
 * @param {*} brower
 * @param {*} callback
 */
function _getBrowerAndVersion(ua, brower, callback) {
	if (ua.match(/chrome/) != null) {
		const version = ua.match(/chrome\/([\d.]+)/)[1]
		_out({ brower, kit: 'chrome', version })
		callback && typeof callback === 'function' && callback()
		// webkit内核支持一个CSS属性来控制字体平滑
		_addStyle(['-webkit-font-smoothing: antialiased;'], 'WebkitCss')
	} else {
		const version =
			ua.match(/msie ([\d.]+)/) != null
				? ua.match(/msie ([\d.]+)/)[1]
				: ua.match(/rv:([\d.]+)/)[1]
		_out({ brower, kit: 'ie', version })
		_handleNotSupportBrower()
	}
}

function _handleNotSupportBrower() {
	window.alert('当前浏览器版本不支持,请下载最新chrome打开系统')
	window.location.href =
		'https://www.google.cn/intl/zh-CN/chrome/?brand=CHBD&gclid=Cj0KCQjw3JXtBRC8ARIsAEBHg4mtCWhVDkN6elfU1DLVmakT-7Ks6bRVNNp0Q9zRZXy7J6TuxSNSRFcaAihrEALw_wcB&gclsrc=aw.ds'
}

function _out(info) {
	console.group()
	console.log('浏览器==>', info.brower)
	console.log('核心==>', info.kit)
	console.log('版本==>', info.version)
	console.groupEnd()
}

function _mime(option, value) {
	const mimeTypes = navigator.mimeTypes
	for (const mt in mimeTypes) {
		if (mimeTypes[mt][option] === value) {
			return true
		}
	}
	return false
}

/**
 *  清理搜狗浏览器对于密码框默认的输入键盘
 */
function _clearSafeboxInSougo() {
	document.onreadystatechange = () => {
		if (document.readyState === 'complete') {
			// 屏蔽搜狗浏览器下的密码框出现小键盘
			window.__sogou_secure_input = {}
			window.__sogou_secure_input.check = function() {}
			window.onerror = function(ev) {
				console.log(ev)
			}
			const styleEl = document.createElement('style')
			const head = document.head || document.getElementsByTagName('head')[0]
			styleEl.type = 'text/css'
			styleEl.id = 'JudgeCss'
			styleEl.innerHTML =
				'#sogou_secure_inputs_container {display: none !important;}input::-webkit-input-safebox-button {display: none !important;}'
			head.appendChild(styleEl)
		}
	}
}

/**
 * 删除ie浏览器password自带的小眼睛
 */
function _clearEyeInIE() {
	const styleEl = document.createElement('style')
	const head = document.head || document.getElementsByTagName('head')[0]
	styleEl.type = 'text/css'
	styleEl.id = 'EyeCss'
	styleEl.innerHTML =
		'input::-ms-clear{display:none;}input::-ms-reveal{display:none;}'
	head.appendChild(styleEl)
}

function _fixLayoutErrorInEdge() {
	document.onreadystatechange = () => {
		if (document.readyState === 'complete') {
			const styleArr = [
				'.el-form-item__label-wrap .el-form-item__label{float:left !important;}',
				'.el-form--inline .el-form-item__label{float:left !important;}',
				'.el-form--inline .el-form-item__content{float:left !important;}'
			]
			_addStyle(styleArr, 'EdgeCss')
		}
	}
}

function _addStyle(style, id) {
	const styleEl = document.createElement('style')
	const head = document.head || document.getElementsByTagName('head')[0]
	styleEl.type = 'text/css'
	styleEl.id = id
	styleEl.innerHTML = style.join('')
	head.appendChild(styleEl)
}
