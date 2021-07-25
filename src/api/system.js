import request from '@/utils/request'
// 系统===》参数字典
export function getkvconfigQueryList(data) {
	return request({
		url: '/kvconfig/queryList',
		method: 'post',
		data
	})
}
// 系统===》参数字典===>修改
export function getkvconfigUpdate(data) {
	return request({
		url: '/kvconfig/update',
		method: 'post',
		data
	})
}
// 系统管理-职员登录日志
export function getSystemUserLoginRecordQueryLoginLog(params) {
	return request({
		url: '/system/userLoginRecord/queryLoginLog',
		method: 'get',
		params
	})
}
// 系统===》参数字典===>修改
export function getUserInfoUpdatePwdAdmin(data) {
	return request({
		url: '/userInfo/updatePwdAdmin',
		method: 'post',
		data
	})
}
// 系统管理-账户设置获取页面
export function getuserInfolist(data) {
	return request({
		url: '/userInfo/list',
		method: 'post',
		data
	})
}
// 系统管理-查询参数字典修改记录列表
export function getQueryRecordList(data) {
	return request({
		url: '/kvconfig/queryRecordList',
		method: 'post',
		data
	})
}
// 第三方回调IP白名单查询
export function getCallbackIpWhiteList(data) {
	return request({
		url: '/callbackIpWhite/select',
		method: 'post',
		data
	})
}
// 新增第三方回调IP白名单
export function addCallbackIpWhite(data) {
	return request({
		url: '/callbackIpWhite/insert',
		method: 'post',
		data
	})
}
// 删除第三方回调IP白名单管理
export function deleteCallbackIpWhite(data) {
	return request({
		url: '/callbackIpWhite/delete',
		method: 'post',
		data
	})
}
// 修改第三方回调IP白名单管理
export function updateCallbackIpWhite(data) {
	return request({
		url: '/callbackIpWhite/update',
		method: 'post',
		data
	})
}
// 修改第三方回调IP白名单状态
export function updateStatusCallbackIpWhite(data) {
	return request({
		url: '/callbackIpWhite/updateStatus',
		method: 'post',
		data
	})
}
export default {
    getkvconfigQueryList,
	getkvconfigUpdate,
	getSystemUserLoginRecordQueryLoginLog,
	getuserInfolist,
	getQueryRecordList,
	getCallbackIpWhiteList,
	addCallbackIpWhite,
	deleteCallbackIpWhite,
	updateCallbackIpWhite,
	updateStatusCallbackIpWhite
}
