import request from '@/utils/request'

// 分页查询角色列表
export function getRoleListPageAPI(params) {
	return request({
		url: '/system/role/queryRoleList',
		method: 'get',
		params
	})
}

// 删除角色
export function deleteRoleAPI(data) {
	return request({
		url: '/system/role/delete',
		method: 'post',
		data
	})
}

// 查询当前登录用户拥有的全部权限
export function getRolePermissionsAPI(params) {
	return request({
		url: '/system/role/queryPermissionList',
		method: 'GET',
		params
	})
}

// 添加角色
export function setSaveRoleInfoAPI(data) {
	return request({
		url: '/system/role/add',
		method: 'post',
		data
	})
}

// 修改角色
export function setUpdateRoleInfoAPI(data) {
	return request({
		url: '/system/role/update',
		method: 'post',
		data
	})
}

// 查询权限列表
export function getRolePermissionListAPI(data) {
	return request({
		url: '/role/permissions/list',
		method: 'post',
		data
	})
}
// 查询角色明细（权限）
export function getRoleDetailInfo(data) {
	return request({
		url: '/role/getRoleDetailInfo',
		method: 'post',
		data
	})
}
// 查询角色状态
export function getRoleStatus(data) {
	return request({
		url: '/role/getRoleStatus',
		method: 'post',
		data
	})
}
// 分页查询角色下的用户
export function getPageRoleUsers(data) {
	return request({
		url: '/role/pageRoleUsers',
		method: 'post',
		data
	})
}

// 修改角色状态
export function setUpdateRoleStatus(data) {
	return request({
		url: '/role/updateRoleStatus',
		method: 'post',
		data
	})
}
export default {
	getRoleListPageAPI,
	deleteRoleAPI,
	getRolePermissionsAPI,
	setSaveRoleInfoAPI,
	setUpdateRoleInfoAPI,
	getRolePermissionListAPI,
	getRoleDetailInfo,
	getRoleStatus,
	getPageRoleUsers,
	setUpdateRoleStatus
}
