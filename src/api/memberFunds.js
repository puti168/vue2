import request from '@/utils/request'

// 资金==> 会员账变记录
export function getMemberFundsRecordsAccountChange(data) {
	return request({
		url: '/memberFundsRecords/accountChange',
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
// 会员账变记录-导出
export function getMemberFundsRecordsAccountChangeDownload(data) {
	return request({
		url: '/memberFundsRecords/accountChange/download',
		method: 'post',
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

// 风控==> 编辑黑名单IP
export function ipBlackEdit(data) {
	return request({
		url: '/ipBlack/edit',
		method: 'post',
		data
	})
}

// 风控==> 删除黑名单IP
export function ipBlackDelete(id) {
	return request({
		url: `/ipBlack/del/${id}`,
		method: 'post'
	})
}

export default {
	getMemberFundsRecordsAccountChange,
	getMerchantGameWalletDic,
	getMemberFundsRecordsAccountChangeDownload,
	getMemberFundsRecordsDeposit,
	ipBlackEdit,
	ipBlackDelete
}
