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
export default {
	getMerchantGameGetMerchantGames,
	getMemberVipRebateSelectAllInfo
}
