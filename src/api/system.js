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
//
export default {
    getkvconfigQueryList,
	getkvconfigUpdate,
	getSystemUserLoginRecordQueryLoginLog,
	getuserInfolist,
	getQueryRecordList
}
