import request from '@/utils/request'

// 审核列表
export function getAuditList(params) {
	return request({
		url: '/auditLog/list',
		method: 'get',
		params
	})
}

// 查看密钥详情
export function getAuditDetail(params) {
	return request({
		url: '/auditLog/detail',
		method: 'get',
		params
	})
}

// 预警日志列表
export function getAlarmList(params) {
	return request({
		url: '/alarm/list',
		method: 'get',
		params
	})
}

// 预警日志详情
export function getAlarmDetail(params) {
	return request({
		url: '/alarm/detail',
		method: 'get',
		params
	})
}
// 添加权限
export function addPermission(data) {
	return request({
		url: '/permission/add',
		method: 'post',
		data
	})
}
// 编辑权限
export function editPermission(data) {
	return request({
		url: '/permission/edit',
		method: 'post',
		data
	})
}
// 生成权限SQL
export function generateSql(data) {
	return request({
		url: '/permission/generateSql',
		method: 'post',
		data
	})
}
// 检查ID是否重复
export function checkExists(params) {
	return request({
		url: '/permission/checkExists',
		method: 'get',
		params
	})
}
// 权限详情
export function permissionDetail(params) {
	return request({
		url: '/permission/detail',
		method: 'get',
		params
	})
}
// 权限列表
export function permissionList(params) {
	return request({
		url: '/permission/list',
		method: 'get',
		params
	})
}
// 加载系统权限（父级菜单）
export function loadBySystem(params) {
	return request({
		url: '/permission/loadBySystem',
		method: 'get',
		params
	})
}
// 查询用户拥有的系统
export function systems(params) {
	return request({
		url: '/permission/systems',
		method: 'get',
		params
	})
}

export default {
	getAlarmList,
	getAlarmDetail,
	getAuditList,
	getAuditDetail,
	systems,
	loadBySystem,
	permissionList,
	permissionDetail,
	checkExists,
	generateSql,
	editPermission,
	addPermission
}
