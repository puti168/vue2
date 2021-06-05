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

// 会员等级
export function getRebateRecordGetVipGrade(data) {
	return request({
		url: '/memberVip/rebateRecord/getVipGrade',
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

// VIP等级配置 ==> 列表
export function memberVipGradeSelectAPI(data) {
	return request({
		url: '/memberVipGrade/select',
		method: 'post',
		data
	})
}

// VIP等级配置 ==> 更新
export function memberVipGradeUpDateAPI(data) {
	return request({
		url: '/memberVipGrade/update',
		method: 'post',
		data
	})
}

// VIP晋级优惠配置 ==> 列表
export function memberVipPromotionListAPI(data) {
	return request({
		url: '/memberVipPromotion/selectMemberVipPromotionList',
		method: 'post',
		data
	})
}

// VIP晋级优惠配置 ==> 更新
export function memberVipPromotionUpdateAPI(data) {
	return request({
		url: '/memberVipPromotion/updateMemberVipPromotionList',
		method: 'post',
		data
	})
}

export default {
	getMerchantGameGetMerchantGames,
	getMemberVipRebateSelectAllInfo,
	getRebateRecordSelectRecords,
	getlistSelectMemberVipOperate,
	getRebateRecordGetVipGrade,
	memberVipGradeSelectAPI,
	memberVipGradeUpDateAPI,
	memberVipPromotionListAPI,
	memberVipPromotionUpdateAPI
}
