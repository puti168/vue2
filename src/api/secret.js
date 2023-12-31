import request from '@/utils/request'

export function blackList(params) {
	return request({
		url: '/bankBlack/list',
		method: 'get',
		params
	})
}
export function memberLoginLog(data) {
	return request({
		url: '/log/memberLoginLog',
		method: 'post',
		data
	})
}
export function recordInfo(data) {
	return request({
		url: '/memberData/recordInfo',
		method: 'post',
		data
	})
}
export function audit(data) {
	return request({
		url: '/memberData/audit',
		method: 'post',
		data
	})
}
export function memberAuditDetail(data) {
	return request({
		url: '/player/memberAuditDetail',
		method: 'post',
		data
	})
}
export function updateMemberAuditRecord(data) {
	return request({
		url: '/player/updateMemberAuditRecord',
		method: 'post',
		data
	})
}
export function memberChange(data) {
	return request({
		url: '/memberData/page',
		method: 'post',
		data
	})
}
export function playerAuditList(data) {
	return request({
		url: '/player/playerAuditList',
		method: 'post',
		data
	})
}
// 会员转代
export function memberTransferAudit(data) {
	return request({
		url: '/memberTransfer/audit',
		method: 'post',
		data
	})
}
export function memberTransferDetail(data) {
	return request({
		url: '/memberTransfer/detail',
		method: 'post',
		data
	})
} export function memberTransferLockOrder(data) {
	return request({
		url: '/memberTransfer/lockOrder',
		method: 'post',
		data
	})
} export function memberTransferSelectPage(data) {
	return request({
		url: '/memberTransfer/selectPage',
		method: 'post',
		data
	})
}
// 新增代理审核
export function lockProxyAuditRecord(data) {
	return request({
		url: '/proxy/lockProxyAuditRecord',
		method: 'post',
		data
	})
}
export function proxyDetail(data) {
	return request({
		url: '/proxy/proxyDetail',
		method: 'post',
		data
	})
}
export function updateProxyAuditRecord(data) {
	return request({
		url: '/proxy/updateProxyAuditRecord',
		method: 'post',
		data
	})
}
export function proxyCommissionRecordAudit(data) {
	return request({
		url: '/proxyCommissionRecord/audit',
		method: 'post',
		data
	})
}
export function proxyList(data) {
	return request({
		url: '/proxy/proxyList',
		method: 'post',
		data
	})
}
// 代理审核
export function proxyDataAudit(data) {
	return request({
		url: '/proxyData/audit',
		method: 'post',
		data
	})
}

export function proxyDataLock(data) {
	return request({
		url: '/proxyData/lock',
		method: 'post',
		data
	})
}
export function proxyDataRecordInfo(data) {
	return request({
		url: '/proxyData/recordInfo',
		method: 'post',
		data
	})
}
export function proxyDataPage(data) {
	return request({
		url: '/proxyData/page',
		method: 'post',
		data
	})
}
export function lock(data) {
	return request({
		url: '/memberData/lock',
		method: 'post',
		data
	})
}
export function lockMemberAuditRecord(data) {
	return request({
		url: '/player/lockMemberAuditRecord',
		method: 'post',
		data
	})
}
export function editBlackList(data) {
	return request({
		url: '/bankBlack/edit',
		method: 'post',
		data
	})
}
export function delBlackList(data) {
	return request({
		url: '/bankBlack/del',
		method: 'post',
		data
	})
}
export function addBlackList(data) {
	return request({
		url: '/bankBlack/add',
		method: 'post',
		data
	})
}
export function memberInComComback(data) {
	return request({
		url: '/memberInCom/comeback',
		method: 'post',
		data
	})
}
export function memberInComQuery(data) {
	return request({
		url: '/memberInCom/query',
		method: 'post',
		data
	})
}
export function memberInComSave(data) {
	return request({
		url: '/memberInCom/save',
		method: 'post',
		data
	})
}

export default {
	memberInComComback,
	memberInComQuery,
	memberInComSave,
	memberTransferAudit,
	memberTransferDetail,
	memberTransferLockOrder,
	memberTransferSelectPage,
	updateProxyAuditRecord,
	proxyCommissionRecordAudit,
	lockProxyAuditRecord,
	proxyDetail,
	proxyList,
	recordInfo,
	memberChange,
	proxyDataAudit,
	proxyDataLock,
	proxyDataRecordInfo,
	memberAuditDetail,
	proxyDataPage,
	audit,
	lockMemberAuditRecord,
	updateMemberAuditRecord,
	lock,
	playerAuditList,
	blackList,
	memberLoginLog,
	editBlackList,
	delBlackList,
	addBlackList
}
