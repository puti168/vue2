import request from '@/utils/request'

export function getRoles(params) {
	return request({
		url: '/role/list',
		method: 'GET',
		params
	})
}

export function getEditRoles(params) {
	return request({
		url: '/user/userEditRoleList',
		method: 'GET',
		params
	})
}
export function getUserPermissions(params) {
	return request({
		url: '/role/permissions',
		method: 'GET',
		params
	})
}
export function getPermissionsByRole(params) {
	return request({
		url: '/role/roleDetail',
		method: 'GET',
		params
	})
}

export function getUsers(data) {
	return request({
		url: '/user/list',
		method: 'get',
		params: data
	})
}

export function addRole(data) {
	return request({
		url: '/role/add',
		method: 'post',
		data
	})
}
export function editRole(data) {
	return request({
		url: '/role/editRole',
		method: 'post',
		data
	})
}
export function updateStatus(data) {
	return request({
		url: '/role/modifyStatus',
		method: 'post',
		data
	})
}
export function delRole(data) {
	return request({
		url: '/role/deleteRole',
		method: 'post',
		data
	})
}

export function getAllPermissions(data) {
	return request({
		url: '/role/allPermissions',
		method: 'get',
		data
	})
}
