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
	const specialKey =
		'#$&@/&*!~~!%^()_\\-+=<>?:"{}|,./;\'\\\\[\\]·~！@#￥%……&*（）——\\-+={}|《》？：“'
	for (let i = 0; i < str.length; i++) {
		if (specialKey.indexOf(str.substr(i, 1)) !== -1) {
			return false
		}
	}
	return true
}

export function isHaveEmoji(str) {
	const regex = emojiRegex()
	return !!regex.exec(str)
}

// 防抖
export const debounce = (func, wait = 60) => {
	let timer = null
	return function(...args) {
		clearTimeout(timer)
		timer = setTimeout(() => func.apply(this, args), wait)
	}
}

// 节流函数
export const throttle = (func, delay = 60) => {
	let timer = null
	let start = 0
	return function(...args) {
		const current = +new Date()
		clearTimeout(timer)
		if (current - start > delay) {
			func.apply(this, args)
			start = current
		} else {
			timer = setTimeout(() => func.apply(this, args), delay)
		}
	}
}
