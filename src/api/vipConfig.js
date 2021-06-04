import request from '@/utils/request'

// 商户场馆=>获取游戏
export function getMerchantGameGetMerchantGames(data) {
	return request({
		url: '/merchantGame/getMerchantGames',
		method: 'post',
		data
	})
}
// 商户场馆=>获取游戏
export function getMemberVipRebateSelectAllInfo(data) {
	return request({
		url: '/memberVip/rebate/selectAllInfo',
		method: 'post',
		data
	})
}

// 查询配置VIP记录
export function getRebateRecordSelectRecords(data) {
	return request({
		url: '/memberVip/rebateRecord/selectRecords',
		method: 'post',
		data
	})
}

// vIP配置操作记录
export function getlistSelectMemberVipOperate(data) {
	return request({
		url: '/memberVipOperate/listSelectMemberVipOperate',
		method: 'post',
		data
	})
}

export default {
	getMerchantGameGetMerchantGames,
	getMemberVipRebateSelectAllInfo,
	getlistSelectMemberVipOperate,
	getRebateRecordSelectRecords
}
