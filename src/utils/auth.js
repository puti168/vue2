import Cookies from 'js-cookie'
const TokenKey = 'vue_admin_template_token'

export function getToken() {
	return Cookies.get(TokenKey)
}
export function getRoles() {
	try {
		const roles = JSON.parse(localStorage.roles)
		return roles
	} catch (e) {
		return []
	}
}
export function setRoles(val) {
	localStorage.roles = JSON.stringify(val)
	return val
}
export function setGameTypes(val) {
	return Cookies.set('game_types', val)
}
export function getGameTypes() {
	return Cookies.get('game_types')
}
export function getId() {
	return Cookies.get('id')
}
export function getUsername() {
	return Cookies.get('username')
}
export function getNickName() {
	return Cookies.get('nickName')
}
export function setToken(token) {
	return Cookies.set(TokenKey, token)
}
export function setId(token) {
	return Cookies.set('id', token)
}
export function setUsername(token) {
	return Cookies.set('username', token)
}
export function setNickName(token) {
	return Cookies.set('nickName', token)
}
export function removeToken() {
	return Cookies.remove(TokenKey)
}
export function clearCookie() {
	const cookies = [
		'game_types',
		'id',
		'nickName',
		'sidebarStatus',
		'userInfo',
		'username'
	]
	cookies.forEach((i) => {
		Cookies.remove(i)
	})
}
