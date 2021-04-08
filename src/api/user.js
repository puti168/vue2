import request from '@/utils/request'

export function login(params) {
	return request({
		url: '/user/login',
		method: 'GET',
		params
	})
}
/**
 * 查询商户组织树
 * @param {*} params
 */
export function searchOrganization(params) {
	return request({
		url: '/user/searchOrganization',
		method: 'GET',
		params
	})
}
export function modifyPassword(data) {
	return request({
		url: '/user/modifyPassword',
		method: 'post',
		data
	})
}
export function modifyXPSPassword(data) {
	return request({
		url: '/user/modifyMobileUserPassword',
		method: 'post',
		data
	})
}
export function updateStatus(data) {
	return request({
		url: '/user/modifyStatus',
		method: 'post',
		data
	})
}
export function updateXPSStatus(data) {
	return request({
		url: '/user/modifyMobileUserStatus',
		method: 'post',
		data
	})
}
export function getRoles(params) {
	return request({
		url: '/user/roleList',
		method: 'GET',
		params
	})
}
export function userEditRoleList(params) {
	return request({
		url: '/user/userEditRoleList',
		method: 'GET',
		params
	})
}
export function getUserRoles(params) {
	return request({
		url: '/user/getUserDetail',
		method: 'GET',
		params
	})
}
export function editUser(data) {
	return request({
		url: '/user/edit',
		method: 'post',
		data
	})
}
export function editXPSUser(data) {
	return request({
		url: '/user/updateMobile',
		method: 'post',
		data
	})
}
export function addUser(data) {
	return request({
		url: '/user/add',
		method: 'post',
		data
	})
}
export function addXPSUser(data) {
	return request({
		url: '/user/addMobile',
		method: 'post',
		data
	})
}
export function getUsers(data) {
	return request({
		url: '/user/list',
		method: 'get',
		params: data
	})
}

export function logout(params) {
	return request({
		url: '/user/logout',
		method: 'get',
		params
	})
}

export function switchLanguage(data) {
	// lang:中文:zh_CN,英文:en_US
	return request({
		url: '/language/switchLanguage',
		method: 'get',
		params: data
	})
}

export default {
	login,
	logout,
	switchLanguage
}
