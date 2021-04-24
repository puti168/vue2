import request from '@/utils/request'

export function login(data) {
	return request({
		url: '/login',
		method: 'post',
		data: {
			...data,
			type: 1
		}
	})
}

export function logout() {
	return request({
		url: '/logout',
		method: 'post'
	})
}
export function updateXPSStatus(data) {
	return request({
		url: '/user/updateUserStatus',
		method: 'post',
		data
	})
}
export function modifyPassword(data) {
	return request({
		url: '/user/updatePassword',
		method: 'post',
		data
	})
}
export function getUsers(data) {
	return request({
		url: '/user/listPage',
		method: 'post',
		data
	})
}
// 字典列表选择框
export function getSecurityDictList(params) {
	return request({
		url: '/securityDict/list',
		method: 'get',
		params
	})
}
// 设置用户字典
export function setUserSecurityDict(data) {
	return request({
		url: '/securityDict/setUserDicts',
		method: 'post',
		data
	})
}
// 角色列表
export function getRoleList(data) {
	return request({
		url: '/role/listPage',
		method: 'post',
		data
	})
}
// 用户明细
export function getUserRoles(data) {
	return request({
		url: '/user/getUserDetailInfo',
		method: 'post',
		data
	})
}
// 会员管理==> 会员列表
export function memberList(data) {
	return request({
		url: '/user/queryMember',
		method: 'post',
		data
	})
}
// 编辑用户
export function editUser(data) {
	return request({
		url: '/user/updateUserInfo',
		method: 'post',
		data
	})
}
// 新增用户
export function addUser(data) {
	return request({
		url: '/user/add',
		method: 'post',
		data
	})
}
export default {
	login,
	logout,
	getUsers,
	addUser,
	editUser,
	getUserRoles,
	getRoleList,
	modifyPassword,
	getSecurityDictList,
	setUserSecurityDict,
	updateXPSStatus,
	memberList
}
