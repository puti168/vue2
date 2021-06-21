import request from '@/utils/request'
// 代理提款设置-新增代理提款设置
export function getWithdrawSettingProxyAdd(data) {
	return request({
		url: '/withdrawSettingProxy/add',
		method: 'post',
		data
	})
}
// 代理提款设置-分页代理提款设置
export function getWithdrawSettingProxySelectPage(data) {
	return request({
		url: '/withdrawSettingProxy/selectPage',
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
export function getProxyFundsRecordsAssistDepositDownload(data) {
	return request({
		url: 'proxyFundsRecords/assistDeposit/download',
		method: 'post',
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
		data
	})
}
export default {
    getWithdrawSettingProxyAdd,
    getWithdrawSettingProxySelectPage,
	getProxyFundsRecordsAccountChange,
	getDictgetAllDictList,
	getProxyFundsRecordsAssistDepositDownload,
	getProxyFundsRecordsDeposit,
	getProxyFundsRecordsDepositDownload,
	getproxyFundsRecordsWithdraw,
	getProxyFundsRecordsWithdrawDownload,
	getProxyFundsRecordsTransfer,
	getProxyFundsRecordsTransferDownload
}
