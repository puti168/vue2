import request from '@/utils/request'

// 代理==> 代理管理 ===> 新增代理
export function addAgentAPI(data) {
	return request({
		url: '/proxy/addProxy',
		method: 'post',
		data
	})
}
// 代理详情-信息编辑
export function setProxyDataInfoEdit(data) {
	return request({
		url: '/proxyData/infoEdit',
		method: 'post',
		data
	})
}
// 代理详情-代理备注信息分页
export function getProxyDetailRemark(data) {
	return request({
		url: '/proxyDetail/remark',
		method: 'post',
		data
	})
}
// 代理详情-余额查询接口
export function getProxyDataBalance(data) {
	return request({
		url: '/proxyDetail/balance',
		method: 'post',
		data
	})
}
// 代理详情-佣金信息
export function getProxyDataCommission(data) {
	return request({
		url: '/proxyDetail/commission',
		method: 'post',
		data
	})
}
// 代理详情-存提信息
export function getRechargeAndWithdrawInfo(data) {
	return request({
		url: '/proxyDetail/rechargeAndWithdrawInfo',
		method: 'post',
		data
	})
}
// 代理详情-代存信息
export function getProxyDetailProxyRechargeInfo(data) {
	return request({
		url: '/proxyDetail/ProxyRechargeInfo',
		method: 'post',
		data
	})
}
// 代理详情-团队成员概览
export function getProxyDetailTeamInfo(data) {
	return request({
		url: '/proxyDetail/teamInfo',
		method: 'post',
		data
	})
}
// 代理详情-团队成员投注信息
export function getProxyDetailTeamBet(data) {
	return request({
		url: '/proxyDetail/teamBet',
		method: 'post',
		data
	})
}
// 代理详情-top3投注，输赢
export function getProxyDetailTop3Bet(data) {
	return request({
		url: '/proxyDetail/top3Bet',
		method: 'post',
		data
	})
}
// 代理详情-登录日志
export function getProxyDetailProxyLoginLog(data) {
	return request({
		url: '/proxyDetail/proxyLoginLog',
		method: 'post',
		data
	})
}

//  推广管理-推广域名管理-删除推广域名管理
export function setDomainDelete(data) {
	return request({
		url: '/obPromoteDomain/delete',
		method: 'post',
		data
	})
}
//  推广管理-推广域名管理-新增推广域名管理
export function addDomainInsert(data) {
	return request({
		url: '/obPromoteDomain/insert',
		method: 'post',
		data
	})
}
//  推广管理-推广域名管理-分页查询推广域名管理
export function getDomainSelect(data) {
	return request({
		url: '/obPromoteDomain/select',
		method: 'post',
		data
	})
}
//  推广管理-推广域名管理-修改推广域名管理
export function setDomainUpdate(data) {
	return request({
		url: '/obPromoteDomain/update',
		method: 'post',
		data
	})
}

export default {
	addAgentAPI,
	setProxyDataInfoEdit,
	getProxyDetailRemark,
	getProxyDataBalance,
	getProxyDataCommission,
	getRechargeAndWithdrawInfo,
	getProxyDetailProxyRechargeInfo,
	getProxyDetailTeamInfo,
	getProxyDetailTeamBet,
	getProxyDetailTop3Bet,
	getProxyDetailProxyLoginLog,
	setDomainDelete,
	addDomainInsert,
	getDomainSelect,
	setDomainUpdate
}
