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

// 资金 ===> 资金审核记录 ==> 会员提款审核记录
export function memberWithdrawRecordAPI(data) {
	return request({
		url: '/user/queryMember',
		method: 'post',
		data
	})
}

// 资金 ===> 资金审核记录 ==> 会员人工增加额度记录
export function memberIncreaseQuotaRecordAPI(data) {
	return request({
		url: '/user/queryMember',
		method: 'post',
		data
	})
}

// 资金 ===> 资金审核记录 ==> 代理提款审核记录
export function agentWithdrawRecordAPI(data) {
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
	agentDeductQuotaAPI,
	memberWithdrawRecordAPI,
	memberIncreaseQuotaRecordAPI,
	agentWithdrawRecordAPI
}
