import request from '@/utils/request'

// 资金 ===> 资金调整 ==> 会员人工增加额度
export function memberIncreaseQuotaAPI(data) {
	return request({
		url: '/memberArtificialPatchAccountAdd/apply',
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

// 图片id
export function getImageIdAPI(params) {
	return request({
		url: '/imageManagement/getRelationId',
		method: 'GET',
		params
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
		url: '/FundsAuthRecords/memberWithDraw',
		method: 'post',
		data
	})
}

// 资金 ===> 资金审核记录 ==> 会员提款审核记录 ==> 查看
export function memberWithdrawDetailsAPI(data) {
	return request({
		url: '/memberWithDrawUser/selectMemberWithdrawUser',
		method: 'post',
		data
	})
}

// 资金 ===> 资金审核记录 ==> 会员人工增加额度记录
export function memberIncreaseQuotaRecordAPI(data) {
	return request({
		url: '/FundsAuthRecords/memberAddAudit',
		method: 'post',
		data
	})
}

// 资金 ===> 资金审核记录 ==> 会员人工增加额度记录  ==> 查看
export function memberIncreaseQuotaDetailsAPI(data) {
	return request({
		url: '/memberArtificialPatchAccountAddAudit/auditDetail',
		method: 'post',
		data
	})
}

// 资金 ===> 资金审核记录 ==> 代理提款审核记录
export function agentWithdrawRecordAPI(data) {
	return request({
		url: '/FundsAuthRecords/proxyWithDraw',
		method: 'post',
		data
	})
}

// 资金 ===> 资金审核记录 ==> 代理提款审核记录 ==> 查看
export function agentWithdrawDetailsAPI(data) {
	return request({
		url: '/memberWithDrawProxy/selectMemberWithdrawProxy',
		method: 'post',
		data
	})
}

// 审核相关
export function selectMemberWithdrawUser(data) {
	return request({
		url: '/memberWithDrawUser/selectMemberWithdrawUser',
		method: 'post',
		data
	})
}
export function selectMemberWithDrawAuthEsPageOne(data) {
	return request({
		url: '/memberWithDrawUser/selectMemberWithDrawAuthEsPageOne',
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
		url: '/memberArtificialPatchAccountAddAudit/secondAudit/page',
		method: 'post',
		data
	})
}
export function updateWithDrawAuthOne(data) {
	return request({
		url: '/memberWithDrawUser/updateWithDrawAuthOne',
		method: 'post',
		data
	})
}
export function selectMemberWithDrawAuthEsPageThree(data) {
	return request({
		url: '/memberWithDrawUser/selectMemberWithDrawAuthEsPageThree',
		method: 'post',
		data
	})
}
export function selectMemberWithDrawAuthEsPageTwo(data) {
	return request({
		url: '/memberWithDrawUser/selectMemberWithDrawAuthEsPageTwo',
		method: 'post',
		data
	})
}
export function selectMemberWithDrawAuthEsPagePay(data) {
	return request({
		url: '/memberWithDrawUser/selectMemberWithDrawAuthEsPagePay',
		method: 'post',
		data
	})
}
export function selectMemberWithDrawAuthEsPageOneProxy(data) {
	return request({
		url: '/memberWithDrawProxyOne/selectMemberWithDrawAuthEsPageOne',
		method: 'post',
		data
	})
}
export function updateWithDrawAuthOneProxy(data) {
	return request({
		url: '/memberWithDrawProxyOne/updateWithDrawAuthOne',
		method: 'post',
		data
	})
}
export function selectMemberWithDrawAuthEsPageThreeProxy(data) {
	return request({
		url: '/memberWithDrawProxyThree/selectMemberWithDrawAuthEsPageThree',
		method: 'post',
		data
	})
}
export function selectMemberWithDrawAuthEsPagePayProxy(data) {
	return request({
		url: '/memberWithDrawProxyPay/selectMemberWithDrawAuthEsPagePay',
		method: 'post',
		data
	})
}
export function selectMemberWithDrawAuthEsPageTwoProxy(data) {
	return request({
		url: '/memberWithDrawProxyTwo/selectMemberWithDrawAuthEsPageTwo',
		method: 'post',
		data
	})
}
export function fundsAuthRecordsProxyAddAudit(data) {
	return request({
		url: '/FundsAuthRecords/proxyAddAudit',
		method: 'post',
		data
	})
}
export function proxyCommissionRecordSelectCommission(data) {
	return request({
		url: '/proxyCommissionRecord/selectCommission',
		method: 'post',
		data
	})
}
export function proxyCommissionRecordQueryDetail(data) {
	return request({
		url: '/proxyCommissionRecord/queryDetail',
		method: 'post',
		data
	})
}
export function proxyCommissionRecordFirstInstancePage(data) {
	return request({
		url: '/proxyCommissionRecord/firstInstancePage',
		method: 'post',
		data
	})
}
export function lastInstancePage(data) {
	return request({
		url: '/proxyCommissionRecord/lastInstancePage',
		method: 'post',
		data
	})
}
export function proxyCommissionRecordLock(data) {
	return request({
		url: '/proxyCommissionRecord/lock',
		method: 'post',
		data
	})
}
export function memberArtificialPatchAccountAddAuditAuditDetail(data) {
	return request({
		url: '/memberArtificialPatchAccountAddAudit/auditDetail',
		method: 'post',
		data
	})
}
export function memberArtificialPatchAccountAddAuditLockRecord(data) {
	return request({
		url: '/memberArtificialPatchAccountAddAudit/lockRecord',
		method: 'post',
		data
	})
}
export function memberArtificialPatchAccountAddAuditauditRecord(data) {
	return request({
		url: '/memberArtificialPatchAccountAddAudit/auditRecord',
		method: 'post',
		data
	})
}
export function memberWithDrawUserupdateWithdrawLock(data) {
	return request({
		url: '/memberWithDrawUser/updateWithdrawLock',
		method: 'post',
		data
	})
}
export function memberWithDrawUserupdateWithdraw(data) {
	return request({
		url: '/memberWithDrawUser/updateWithdraw',
		method: 'post',
		data
	})
}
export function firstAuditAddAuditProxy(data) {
	return request({
		url: '/proxyArtificialPatchAccountAddAudit/firstAudit/page',
		method: 'post',
		data
	})
}
export function secondAddAuditProxy(data) {
	return request({
		url: '/proxyArtificialPatchAccountAddAudit/second/page',
		method: 'post',
		data
	})
}
export function proxyArtificialPatchAccountAddAuditlockRecord(data) {
	return request({
		url: '/proxyArtificialPatchAccountAddAudit/lockRecord',
		method: 'post',
		data
	})
}
export function proxyArtificialPatchAccountAddAuditauditDetail(data) {
	return request({
		url: '/proxyArtificialPatchAccountAddAudit/auditDetail',
		method: 'post',
		data
	})
}
export function proxyArtificialPatchAccountAddAuditauditRecord(data) {
	return request({
		url: '/proxyArtificialPatchAccountAddAudit/auditRecord',
		method: 'post',
		data
	})
}
export function memberWithDrawProxyUpdateWithdrawLock(data) {
	return request({
		url: '/memberWithDrawProxy/updateWithdrawLock',
		method: 'post',
		data
	})
}
export function memberWithDrawProxySelectMemberWithdrawProxy(data) {
	return request({
		url: '/memberWithDrawProxy/selectMemberWithdrawProxy',
		method: 'post',
		data
	})
}
export function memberWithDrawProxyUpdateWithdraw(data) {
	return request({
		url: '/memberWithDrawProxy/updateWithdraw',
		method: 'post',
		data
	})
}
export function memberWithDrawProxySelectMemberWithDrawAuthEsPagePay(data) {
	return request({
		url: '/memberWithDrawProxy/selectMemberWithDrawAuthEsPagePay',
		method: 'post',
		data
	})
}
export function memberWithDrawProxyselectMemberWithDrawAuthEsPageOne(data) {
	return request({
		url: '/memberWithDrawProxy/selectMemberWithDrawAuthEsPageOne',
		method: 'post',
		data
	})
}
export function memberWithDrawProxyselectMemberWithDrawAuthEsPageTwo(data) {
	return request({
		url: '/memberWithDrawProxy/selectMemberWithDrawAuthEsPageTwo',
		method: 'post',
		data
	})
}
export function memberWithDrawProxyselectMemberWithDrawAuthEsPageThree(data) {
	return request({
		url: '/memberWithDrawProxy/selectMemberWithDrawAuthEsPageThree',
		method: 'post',
		data
	})
}
// 活跃下级
export function ProxyCommissionRecordSubordinate(data) {
	return request({
		url: '/proxyCommissionRecord/subordinate',
		method: 'post',
		data
	})
}
// 总优惠
export function ProxyCommissionRecordTotalDiscount(data) {
	return request({
		url: '/proxyCommissionRecord/totalDiscount',
		method: 'post',
		data
	})
}
// 总返水
export function ProxyCommissionRecordTotalRebate(data) {
	return request({
		url: '/proxyCommissionRecord/totalRebate',
		method: 'post',
		data
	})
}
// 总输赢
export function ProxyCommissionRecordTotalWinOrLose(data) {
	return request({
		url: '/proxyCommissionRecord/totalWinOrLose',
		method: 'post',
		data
	})
}
// 新增活跃下级
export function ProxyCommissionRecordAddSubordinate(data) {
	return request({
		url: '/proxyCommissionRecord/addSubordinate',
		method: 'post',
		data
	})
}
// 场馆费
export function ProxyCommissionRecordVenueFee(data) {
	return request({
		url: '/proxyCommissionRecord/venueFee',
		method: 'post',
		data
	})
}
// 有效活跃下级
export function ProxyCommissionRecordValidSubordinate(data) {
	return request({
		url: '/proxyCommissionRecord/validSubordinate',
		method: 'post',
		data
	})
}
// 新增有效活跃下级
export function ProxyCommissionRecordValidAddSubordinate(data) {
	return request({
		url: '/proxyCommissionRecord/validAddSubordinate',
		method: 'post',
		data
	})
}
// 上月结余
export function ProxyCommissionRecordLastMonthBalance(data) {
	return request({
		url: '/proxyCommissionRecord/lastMonthBalance',
		method: 'post',
		data
	})
}

export default {
	memberWithDrawProxyselectMemberWithDrawAuthEsPageThree,
	memberWithDrawProxyselectMemberWithDrawAuthEsPageTwo,
	memberWithDrawProxyselectMemberWithDrawAuthEsPageOne,
	memberWithDrawProxySelectMemberWithDrawAuthEsPagePay,
	memberWithDrawProxyUpdateWithdrawLock,
	memberWithDrawProxySelectMemberWithdrawProxy,
	memberWithDrawProxyUpdateWithdraw,
	proxyArtificialPatchAccountAddAuditauditRecord,
	proxyArtificialPatchAccountAddAuditauditDetail,
	proxyArtificialPatchAccountAddAuditlockRecord,
	firstAuditAddAuditProxy,
	secondAddAuditProxy,
	memberWithDrawUserupdateWithdraw,
	memberWithDrawUserupdateWithdrawLock,
	memberArtificialPatchAccountAddAuditauditRecord,
	memberArtificialPatchAccountAddAuditLockRecord,
	memberArtificialPatchAccountAddAuditAuditDetail,
	proxyCommissionRecordLock,
	lastInstancePage,
	proxyCommissionRecordFirstInstancePage,
	proxyCommissionRecordQueryDetail,
	proxyCommissionRecordSelectCommission,
	fundsAuthRecordsProxyAddAudit,
	selectMemberWithDrawAuthEsPagePayProxy,
	selectMemberWithDrawAuthEsPageThreeProxy,
	updateWithDrawAuthOneProxy,
	selectMemberWithDrawAuthEsPageOneProxy,
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
	agentWithdrawDetailsAPI,
	memberIncreaseSearchAPI,
	getImageIdAPI,
	ProxyCommissionRecordSubordinate,
	ProxyCommissionRecordTotalDiscount,
	ProxyCommissionRecordTotalRebate,
	ProxyCommissionRecordTotalWinOrLose,
	ProxyCommissionRecordAddSubordinate,
	ProxyCommissionRecordVenueFee,
	ProxyCommissionRecordValidSubordinate,
	ProxyCommissionRecordValidAddSubordinate,
	ProxyCommissionRecordLastMonthBalance
}
