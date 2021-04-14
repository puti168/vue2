/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
 export function parseTime(time, cFormat) {
	if (arguments.length === 0) {
		return null
	}
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
			time = parseInt(time)
		}
		if (typeof time === 'number' && time.toString().length === 10) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
	if (('' + time).length === 10) {
		time = parseInt(time) * 1000
	} else {
		time = +time
	}
	const d = new Date(time)
	const now = Date.now()

	const diff = (now - d) / 1000

	if (diff < 30) {
		return '刚刚'
	} else if (diff < 3600) {
		// less 1 hour
		return Math.ceil(diff / 60) + '分钟前'
	} else if (diff < 3600 * 24) {
		return Math.ceil(diff / 3600) + '小时前'
	} else if (diff < 3600 * 24 * 2) {
		return '1天前'
	}
	if (option) {
		return parseTime(time, option)
	} else {
		return (
			d.getMonth() +
			1 +
			'月' +
			d.getDate() +
			'日' +
			d.getHours() +
			'时' +
			d.getMinutes() +
			'分'
		)
	}
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
	const search = url.split('?')[1]
	if (!search) {
		return {}
	}
	return JSON.parse(
		'{"' +
			decodeURIComponent(search)
				.replace(/"/g, '\\"')
				.replace(/&/g, '","')
				.replace(/=/g, '":"')
				.replace(/\+/g, ' ') +
			'"}'
	)
}

/**
 * 格式化金钱数字
 * @param {number} num
 * @param {Boolean} precision
 */
export function formatCurrency(num, precision = true) {
	if (String(num).includes('.')) precision = true
	if (num === undefined || num === null) {
		return '-'
	}
	if (num === 0 || num === '0') return 0
	num = num.toString().replace(/\$|\,/g, '')
	if (isNaN(num)) num = '0'
	const sign = +num === (num = Math.abs(num))
	num = Math.floor(num * 100 + 0.50000000001)
	let cents = num % 100
	num = Math.floor(num / 100).toString()
	if (cents < 10) cents = '0' + cents
	for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
		num =
			num.substring(0, num.length - (4 * i + 3)) +
			',' +
			num.substring(num.length - (4 * i + 3))
	}
	return (sign ? '' : '-') + num + (precision ? '.' + cents : '')
}

/**
 * excel格式校验
 * @param {file:file} file
 */
export function validateExcel(file) {
	if (!/\.(csv|xlsx|xls|XLSX|XLS)$/.test(file.name)) {
		return false
	}
	return true
}

/**
 * 给正负数加颜色
 * @param {numberVal} numberVal
 */
export function colorNum(numberVal) {
	let color = ''
	if (!numberVal) {
		return color
	}
	if (numberVal > 0) {
		color = 'danger'
	} else if (numberVal < 0) {
		color = 'success'
	}
	return color
}

/**
 * @desc 判断一个对象是否为空
 * @param {Object} obj 对象
 * @return {Boolean}
 */
export function checkNullObj(obj) {
	return Object.keys(obj).length === 0
}
export function isEmptyObj(val) {
	return Object.keys(val).length === 0 && val.constructor === Object
}

/**
 * 判断输入的url是否正确
 * @param {String} str_url
 */
export function IsURL(str_url) {
	return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
		str_url
	)
}

/**
 * @desc 判断金额
 * @param {Number} num 数字
 */
export function isNum(num) {
	return /^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(num)
}
