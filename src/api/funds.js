import request from '@/utils/request'

// 资金 ===> 资金调整 ==> 会员人工增加额度
export function memberIncreaseQuotaAPI(data) {
	return request({
		url: '/user/queryMember',
		method: 'post',
		data
	})
}

// 资金 ===> 会员人工增加额度 ==> 查询余额
export function memberIncreaseSearchAPI(data) {
	return request({
		url: '/artificialPatch/getMemberBalance',
		method: 'post',
		data
	})
}

// 资金 ===> 资金调整 ==> 会员人工扣除额度
export function memberDeductQuotaAPI(data) {
	return request({
		url: '/artificialPatch/member/lessMoney',
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
		url: '/artificialPatch/proxy/proxyLessMoney',
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

// 资金 ===> 资金审核记录 ==> 会员提款审核记录 ==> 查看
export function memberWithdrawDetailsAPI(data) {
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

// 资金 ===> 资金审核记录 ==> 会员人工增加额度记录  ==> 查看
export function memberIncreaseQuotaDetailsAPI(data) {
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

// 资金 ===> 资金审核记录 ==> 代理提款审核记录 ==> 查看
export function agentWithdrawDetailsAPI(data) {
	return request({
		url: '/user/queryMember',
		method: 'post',
		data
	})
}

// 审核相关
export function selectMemberWithdrawUser(data) {
	return request({
		url: '/memberWithDraw/selectMemberWithdrawUser',
		method: 'post',
		data
	})
}
export function selectMemberWithDrawAuthEsPageOne(data) {
	return request({
		url: '/memberWithDrawUserOne/selectMemberWithDrawAuthEsPageOne',
		method: 'post',
		data
	})
}
export function updateWithdrawLock(data) {
	return request({
		url: '/memberWithDraw/updateWithdrawLock',
		method: 'post',
		data
	})
}
export function firstAuditAddAudit(data) {
	return request({
		url: '/memberArtificialPatchAccountAddAudit/firstAudit/page',
		method: 'post',
		data
	})
}
export function secondAddAudit(data) {
	return request({
		url: '/memberArtificialPatchAccountAddAudit/second/page',
		method: 'post',
		data
	})
}
export function updateWithDrawAuthOne(data) {
	return request({
		url: '/memberWithDrawUserOne/updateWithDrawAuthOne',
		method: 'post',
		data
	})
}
export function selectMemberWithDrawAuthEsPageThree(data) {
	return request({
		url: '/memberWithDrawUserThree/selectMemberWithDrawAuthEsPageThree',
		method: 'post',
		data
	})
}
export function selectMemberWithDrawAuthEsPageTwo(data) {
	return request({
		url: '/memberWithDrawUserTwo/selectMemberWithDrawAuthEsPageTwo',
		method: 'post',
		data
	})
}
export function selectMemberWithDrawAuthEsPagePay(data) {
	return request({
		url: '/memberWithDrawUserPay/selectMemberWithDrawAuthEsPagePay',
		method: 'post',
		data
	})
}
export default {
	selectMemberWithDrawAuthEsPagePay,
	selectMemberWithDrawAuthEsPageThree,
	selectMemberWithDrawAuthEsPageTwo,
	selectMemberWithdrawUser,
	updateWithdrawLock,
	updateWithDrawAuthOne,
	selectMemberWithDrawAuthEsPageOne,
	secondAddAudit,
	firstAuditAddAudit,
	memberIncreaseQuotaAPI,
	memberDeductQuotaAPI,
	agentIncreaseQuotaAPI,
	agentDeductQuotaAPI,
	memberWithdrawRecordAPI,
	memberWithdrawDetailsAPI,
	memberIncreaseQuotaRecordAPI,
	memberIncreaseQuotaDetailsAPI,
	agentWithdrawRecordAPI,
	agentWithdrawDetailsAPI
}
