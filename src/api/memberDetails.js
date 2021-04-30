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
// 一键查询所有场馆余额
export function getOneKeyBalance(params) {
	return request({
		url: '/member/oneKeyBalance',
		method: 'get',
		params
	})
}
// 一键下分
export function getOneKeyWithdraw(params) {
	return request({
		url: '/member/oneKeyWithdraw',
		method: 'get',
		params
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
	getOneKeyBalance,
	getOneKeyWithdraw,
	getRolePermissions,
	setSaveRoleInfo,
	setUpdateRoleInfo,
	getBankCardBank
}
