import * as P from './pattern'

/**
 * 验证名称6-12位数字字母
 * @param {} value
 */
export const testName = (value) => {
	return P.USERNAME_NO_SPECIAL_PATTERN.test(value)
}

/**
 * 验证名称3-12位数字或者字母
 * @param {} value
 */
export const testXPName = (value) => {
	return P.USERNAME_3_12.test(value)
}

/**
 * 验证密码6-12位数字字母
 * @param {} value
 */
export const testPassword = (value) => {
	return P.PASSWORD_SIMPLE_PATTERN.test(value)
}

/**
 * 验证简单密码6-12位
 * @param {} value
 */
export const testSimplePassword = (value) => {
	return P.PASSWORD_MORE_SIMPLE_PATTERN.test(value)
}

/**
 * 验证密码3-10位
 * @param {} value
 */
export const testPassword310 = (value) => {
	return P.PASSWORD_3_10.test(value)
}

/**
 * 验证是否有符号
 * @param {} str
 */
export function testSpecial(str) {
	var specialKey =
		"[`+-~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'　@"
	for (var i = 0; i < str.length; i++) {
		if (specialKey.indexOf(str.substr(i, 1)) !== -1) {
			return false
		}
	}
	return true
}

/**
 * 验证表情
 * @param {} value
 */
export const testEmoji = (value) => {
	return P.EMOJI_PATTERN.test(value)
}

/**
 * 验证空白字符
 * @param {} value
 */
export const testSpace = (value) => {
	return P.SPACE_PATTERN.test(value)
}

/**
 * 验证字符串长度
 * @param {} value
 */
export const testStringLength = (value, range = { min: 6, max: 12 }) => {
	const str = String(value)
	if (str.length < range.min || str.length > range.max) {
		return false
	}
	return true
}
