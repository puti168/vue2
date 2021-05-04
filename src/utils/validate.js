import emojiRegex from 'emoji-regex/RGI_Emoji.js'

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
	const valid_map = ['admin', 'editor', 'howard']
	return valid_map.indexOf(str.trim()) >= 0
}

export function notSpecial2(str) {
	const specialKey = '#$&'
	for (let i = 0; i < str.length; i++) {
		if (specialKey.indexOf(str.substr(i, 1)) !== -1) {
			return false
		}
	}
	return true
}

// 手机号
export function isvalidPhone(str) {
	const phoneRegexp = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
	return phoneRegexp.test(str)
}

// 邮箱
export function validateEmail(email) {
	const urlregex = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/g
	return urlregex.test(email)
}

export function isHaveEmoji(str) {
	const regex = emojiRegex()
	return !!regex.exec(str)
}
