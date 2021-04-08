// 主要写验证表单的正则

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
	const valid_map = /^[a-zA-Z0-9_-]{6,12}$/
	return valid_map.test(str)
}
/**
 * @desc 验证6-12位数字,字母和特殊字符的组合
 * @param {string} str
 * @returns {Boolean}
 */
export function validPassword(str) {
	const valid_map = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,12}$/
	return valid_map.test(str)
}

// 支持2位小数正则
export function decimalValidate(value) {
	return /^[0-9]+([.]\d{1,2})?$/.test(value)
}
