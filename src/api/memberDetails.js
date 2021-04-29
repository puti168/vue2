import request from '@/utils/request'
// vip信息
export function getVipInfo(data) {
	return request({
		url: '/vipInfo/info',
		method: 'post',
		data
	})
}
// 查询备注信息
export function getMemberRemarkList(params) {
	return request({
		url: '/memberRemark/list',
		method: 'get',
		params
	})
}
// 查询中心钱包余额
export function getAccountCashAccount(data) {
	return request({
		url: '/account/cashAccount',
		method: 'post',
		data
	})
}
// 查询提现冻结余额
export function getWithdrawalFreeze(data) {
	return request({
		url: '/withdrawalFreeze/withdrawalFreeze',
		method: 'post',
		data
	})
}
// 分页查询角色列表
export function getRoleListPage(data) {
	return request({
		url: '/role/listPage',
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
// 查询当前登录用户拥有的全部权限
export function getRolePermissions(params) {
	return request({
		url: '/role/permissions',
		method: 'GET',
		params
	})
}
// 添加角色
export function setSaveRoleInfo(data) {
	return request({
		url: '/role/saveRoleInfo',
		method: 'post',
		data
	})
}
// 修改角色
export function setUpdateRoleInfo(data) {
	return request({
		url: '/role/updateRoleInfo',
		method: 'post',
		data
	})
}
// 银行卡/虚拟币账号信息
export function getBankCardBank(data) {
	return request({
		url: '/bankCard/bank',
		method: 'post',
		data
	})
}
export default {
	getVipInfo,
	getMemberRemarkList,
	getAccountCashAccount,
	getWithdrawalFreeze,
	getRoleListPage,
	getPageRoleUsers,
	getRolePermissions,
	setSaveRoleInfo,
	setUpdateRoleInfo,
	getBankCardBank
}
