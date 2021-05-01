import request from '@/utils/request'
// 会员详情-基本信息-概要信息以及个人资料
export function getOutlineInfo(params) {
	return request({
		url: `/member/outlineInfo`,
		method: 'get',
		params
	})
}
// 会员详情-基本信息-信息编辑
export function setMemberInfoEdit(data) {
	return request({
		url: '/member/infoEdit',
		method: 'post',
		data
	})
}
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
// 提现流水查询
export function getWithdrawWater(params) {
	return request({
		url: `/withdrawalFreeze/withdrawWater`,
		method: 'get',
		params
	})
}
// 添加会员备注
export function getMemberRemarkAdd(data) {
	return request({
		url: '/memberRemark/add',
		method: 'post',
		data
	})
}
// 会员充提信息查询
export function getPlayerOrderSumInfo(data) {
	return request({
		url: '/player/playerOrderSumInfo',
		method: 'post',
		data
	})
}
// top3平台统计
export function getPlayerTop3(params) {
	return request({
		url: '/player/top3',
		method: 'get',
		params
	})
}
// 会员登录日志查询
export function getLogMemberLoginLog(data) {
	return request({
		url: '/log/memberLoginLog',
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
	getOutlineInfo,
	setMemberInfoEdit,
	getVipInfo,
	getMemberRemarkList,
	getAccountCashAccount,
	getWithdrawalFreeze,
	getOneKeyBalance,
	getOneKeyWithdraw,
	getWithdrawWater,
	getMemberRemarkAdd,
	getPlayerOrderSumInfo,
	getPlayerTop3,
	getLogMemberLoginLog,
	getBankCardBank
}
