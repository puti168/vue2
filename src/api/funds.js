import request from '@/utils/request'

// 资金 ===> 资金调整 ==> 会员人工增加额度
export function memberIncreaseQuotaAPI(data) {
	return request({
		url: '/user/queryMember',
		method: 'post',
		data
	})
}

// 资金 ===> 资金调整 ==> 会员人工扣除额度
export function memberDeductQuotaAPI(data) {
	return request({
		url: '/user/queryMember',
		method: 'post',
		data
	})
}

// 资金 ===> 资金调整 ==> 代理人工增加额度
export function agentIncreaseQuotaAPI(data) {
	return request({
		url: '/user/queryMember',
		method: 'post',
		data
	})
}

// 资金 ===> 资金调整 ==> 代理人工扣除额度
export function agentDeductQuotaAPI(data) {
	return request({
		url: '/user/queryMember',
		method: 'post',
		data
	})
}

export default {
	memberIncreaseQuotaAPI,
	memberDeductQuotaAPI,
	agentIncreaseQuotaAPI,
	agentDeductQuotaAPI
}
