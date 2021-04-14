import request from '@/utils/request'

// 密钥列表
export function getSecretList(params) {
	return request({
		url: '/securityKey/list',
		method: 'get',
		params
	})
}

// 查看密钥详情
export function getSecretDetail(params) {
	return request({
		url: '/securityKey/detail',
		method: 'get',
		params
	})
}

// 添加密钥
export function addSecurity(data) {
	return request({
		url: '/securityKey/add',
		method: 'post',
		data
	})
}

// 用户字典列表
export function getUserSecurityDict(params) {
	return request({
		url: '/securityDict/listByUser',
		method: 'get',
		params
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

export function editKeyStatus(params) {
	return request({
		url: '/securityKey/editKeyStatus',
		method: 'get',
		params
	})
}

export default {
	getSecretList,
	getSecretDetail,
	addSecurity,
	getUserSecurityDict,
	getSecurityDictList,
	setUserSecurityDict,
	editKeyStatus
}
