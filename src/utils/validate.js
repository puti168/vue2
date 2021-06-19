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
