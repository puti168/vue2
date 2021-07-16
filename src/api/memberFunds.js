import request from '@/utils/request'
// 代理提款设置==>新增代理提款设置
export function setProxyWithdrawalAdd(data) {
	return request({
		url: '/proxyWithdrawal/add',
		method: 'post',
		data
	})
}
// 代理提款设置==>删除代理提款设置
export function setProxyWithdrawalDelete(data) {
	return request({
		url: '/proxyWithdrawal/delete',
		method: 'post',
		data
	})
}
// 代理提款设置==>修改代理提款设置
export function setproxyWithdrawalUpdate(data) {
	return request({
		url: '/proxyWithdrawal/update',
		method: 'post',
		data
	})
}
// 会员资金记录==>场馆钱包字段
export function getMerchantGameWalletDic(data) {
	return request({
		url: '/merchantGame/walletDic',
		method: 'post',
		data
	})
}
// 资金==> 会员账变记录
export function getMemberFundsRecordsAccountChange(data) {
	return request({
		url: '/memberFundsRecords/accountChange',
		method: 'post',
		data
	})
}
// 会员账变记录-导出
export function getMemberFundsRecordsAccountChangeDownload(data) {
	return request({
		url: '/memberFundsRecords/accountChange/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}
// 会员存款记录
export function getMemberFundsRecordsDeposit(data) {
	return request({
		url: '/memberFundsRecords/deposit',
		method: 'post',
		data
	})
}
// 会员存款记录-导出
export function getMemberFundsRecordsDepositDownload(data) {
	return request({
		url: '/memberFundsRecords/deposit/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}
// 会员提款记录
export function getMemberFundsRecordsWithdraw(data) {
	return request({
		url: '/memberFundsRecords/withdraw',
		method: 'post',
		data
	})
}
// 会员提款记录-导出
export function getMemberFundsRecordsWithdrawDownload(data) {
	return request({
		url: '/memberFundsRecords/withdraw/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}
// 会员提款记录
export function getMemberFundsRecordsTransfer(data) {
	return request({
		url: '/memberFundsRecords/transfer',
		method: 'post',
		data
	})
}
// 会员提款记录-导出
export function getMemberFundsRecordsTransferDownload(data) {
	return request({
		url: '/memberFundsRecords/transfer/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}
// 会员人工加额度记录
export function getMemberFundsRecordsArtificialAccountAdd(data) {
	return request({
		url: '/memberFundsRecords/artificialAccountAdd',
		method: 'post',
		data
	})
}
// 会员人工加额度记录-导出
export function getMemberFundsRecordsArtificialAccountAddDownload(data) {
	return request({
		url: '/memberFundsRecords/artificialAccountAdd/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}
// 会员人工扣除额度记录
export function getMemberFundsRecordsArtificialAccountSub(data) {
	return request({
		url: '/memberFundsRecords/artificialAccountSub',
		method: 'post',
		data
	})
}
// 会员人工扣除额度记录-导出
export function getMemberFundsRecordsArtificialAccountSubDownload(data) {
	return request({
		url: '/memberFundsRecords/artificialAccountSub/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}
// 会员返水记录
export function getMemberFundsRecordsRebateRecord(data) {
	return request({
		url: '/memberFundsRecords/rebateRecord',
		method: 'post',
		data
	})
}
// 会员返水记录-导出
export function getMemberFundsRecordsRebateRecordDownload(data) {
	return request({
		url: '/memberFundsRecords/rebateRecord/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}
// 会员活动彩金记录
export function getMemberFundsRecordsDiscount(data) {
	return request({
		url: '/memberFundsRecords/discount',
		method: 'post',
		data
	})
}
// 会员活动彩金记录-导出
export function getMemberFundsRecordsDiscountDownload(data) {
	return request({
		url: '/memberFundsRecords/discount/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}
// VIP奖励发放记录
export function getMemberFundsRecordsVipReward(data) {
	return request({
		url: '/memberFundsRecords/vipReward',
		method: 'post',
		data
	})
}
export default {
	setProxyWithdrawalAdd,
	setProxyWithdrawalDelete,
	setproxyWithdrawalUpdate,
	getMerchantGameWalletDic,
	getMemberFundsRecordsAccountChange,
	getMemberFundsRecordsAccountChangeDownload,
	getMemberFundsRecordsDeposit,
	getMemberFundsRecordsDepositDownload,
	getMemberFundsRecordsWithdraw,
	getMemberFundsRecordsWithdrawDownload,
	getMemberFundsRecordsTransfer,
	getMemberFundsRecordsTransferDownload,
	getMemberFundsRecordsArtificialAccountAdd,
	getMemberFundsRecordsArtificialAccountAddDownload,
	getMemberFundsRecordsArtificialAccountSub,
	getMemberFundsRecordsArtificialAccountSubDownload,
	getMemberFundsRecordsRebateRecord,
	getMemberFundsRecordsRebateRecordDownload,
	getMemberFundsRecordsDiscount,
	getMemberFundsRecordsDiscountDownload,
	getMemberFundsRecordsVipReward
}
