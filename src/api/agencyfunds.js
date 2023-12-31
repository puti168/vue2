import request from '@/utils/request'
// 代理提款设置-所有会员提款设置
export function getMemberWithdrawalSelectAll(params) {
	return request({
		url: '/memberWithdrawal/selectAll',
		method: 'get',
		params
	})
}
// 代理提款设置-会员提款设置-新增vip下拉框
export function getMemberWithdrawalSelect(params) {
	return request({
		url: '/memberWithdrawal/select',
		method: 'get',
		params
	})
}
// 代理提款设置-新增会员理提款设置==额度
export function getMemberWithdrawalGetWithdrawal(data) {
	return request({
		url: '/memberWithdrawal/getWithdrawal',
		method: 'post',
		data
	})
}
// 代理提款设置-新增会员理提款设置
export function getMemberWithdrawalAdd(data) {
	return request({
		url: '/memberWithdrawal/add',
		method: 'post',
		data
	})
}
// 代理提款设置-新增会员理提款设置==>修改
export function getMemberWithdrawalUpdate(data) {
	return request({
		url: '/memberWithdrawal/update',
		method: 'post',
		data
	})
}
// 代理提款设置-修改员理提款设置
export function getAemberWithdrawalUpdate(data) {
	return request({
		url: '/memberWithdrawal/update',
		method: 'post',
		data
	})
}
// 代理提款设置-分页代理提款设置
export function getProxyWithdrawalSelectPage(data) {
	return request({
		url: '/proxyWithdrawal/selectPage',
		method: 'post',
		data
	})
}
// 代理资金记录-代理账变记录
export function getProxyFundsRecordsAccountChange(data) {
	return request({
		url: 'proxyFundsRecords/accountChange',
		method: 'post',
		data
	})
}
export function getDictgetAllDictList(params) {
	return request({
		url: '/dict/getAllDictList',
		method: 'get',
		params
	})
}

// 代理资金记录-导出
export function getProxyFundsRecordsAccountChangeDownload(data) {
	return request({
		url: '/proxyFundsRecords/accountChange/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}
// 代理资金记录-代理存款记录
export function getProxyFundsRecordsDeposit(data) {
	return request({
		url: '/proxyFundsRecords/deposit',
		method: 'post',
		data
	})
}

// 代理资金记录-存款记录导出
export function getProxyFundsRecordsDepositDownload(data) {
	return request({
		url: '/proxyFundsRecords/deposit/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}
// 代理资金记录-代理提款记录
export function getproxyFundsRecordsWithdraw(data) {
	return request({
		url: '/proxyFundsRecords/withdraw',
		method: 'post',
		data
	})
}
// 代理资金记录-提款记录导出
export function getProxyFundsRecordsWithdrawDownload(data) {
	return request({
		url: '/proxyFundsRecords/withdraw/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}
// 代理资金记录-代理转账记录
export function getProxyFundsRecordsTransfer(data) {
	return request({
		url: '/proxyFundsRecords/transfer',
		method: 'post',
		data
	})
}
// 代理资金记录-转账记录导出
export function getProxyFundsRecordsTransferDownload(data) {
	return request({
		url: '/proxyFundsRecords/transfer/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}
// 代理资金记录-代理转账记录
export function getProxyFundsRecordsAssistDeposit(data) {
	return request({
		url: '/proxyFundsRecords/assistDeposit',
		method: 'post',
		data
	})
}
// 代理资金记录-代存记录导出
export function getProxyFundsRecordsAssistDepositDownload(data) {
	return request({
		url: '/proxyFundsRecords/assistDeposit/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}
// 代理资金记录-人工加额申请记录
export function getProxyFundsRecordsArtificialAccountAdd(data) {
	return request({
		url: '/proxyFundsRecords/artificialAccountAdd',
		method: 'post',
		data
	})
}
// 代理资金记录-人工加额申请记录导出
export function getProxyFundsRecordsArtificialAccountAddDownload(data) {
	return request({
		url: '/proxyFundsRecords/artificialAccountAdd/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}
// 代理资金记录-人工扣除额度申请记录
export function getProxyFundsRecordsArtificialAccountSub(data) {
	return request({
		url: '/proxyFundsRecords/artificialAccountSub',
		method: 'post',
		data
	})
}
// 代理资金记录-人工扣除额度申请记录导出
export function getProxyFundsRecordsArtificialAccountSubDownload(data) {
	return request({
		url: '/proxyFundsRecords/artificialAccountSub/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}
// 代理资金记录-佣金记录
export function getProxyCommissionRecordSelect(data) {
	return request({
		url: '/proxyCommissionRecord/select',
		method: 'post',
		data
	})
}
// 代理资金记录-佣金记录导出
export function getProxyCommissionRecordProxyCommissionExport(data) {
	return request({
		url: '/proxyCommissionRecord/proxyCommissionExport',
		responseType: 'blob',
		method: 'post',
		data
	})
}
// 会员提款设置==>修改会员提款设置
export function setwithdrawSettingMemberUpdate(data) {
	return request({
		url: '/withdrawSettingMember/update',
		method: 'post',
		data
	})
}
// 会员提款设置==>初始化提款设置
export function getWithdrawSettingMemberreset(data) {
	return request({
		url: '/withdrawSettingMember/reset',
		method: 'post',
		data
	})
}
export default {
	getProxyWithdrawalSelectPage,
	getProxyFundsRecordsAccountChange,
	getDictgetAllDictList,
	getProxyFundsRecordsAccountChangeDownload,
	getProxyFundsRecordsDeposit,
	getProxyFundsRecordsDepositDownload,
	getproxyFundsRecordsWithdraw,
	getProxyFundsRecordsWithdrawDownload,
	getProxyFundsRecordsTransfer,
	getProxyFundsRecordsTransferDownload,
	getProxyFundsRecordsAssistDeposit,
	getProxyFundsRecordsAssistDepositDownload,
	getProxyFundsRecordsArtificialAccountAdd,
	getProxyFundsRecordsArtificialAccountAddDownload,
	getProxyFundsRecordsArtificialAccountSub,
	getProxyCommissionRecordSelect,
	getMemberWithdrawalSelectAll,
	getMemberWithdrawalAdd,
	getAemberWithdrawalUpdate,
	getProxyFundsRecordsArtificialAccountSubDownload,
	getProxyCommissionRecordProxyCommissionExport,
	setwithdrawSettingMemberUpdate,
	getWithdrawSettingMemberreset,
	getMemberWithdrawalSelect,
	getMemberWithdrawalGetWithdrawal,
	getMemberWithdrawalUpdate
}
