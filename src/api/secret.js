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
export function recordInfo(params) {
	return request({
		url: '/memberData/recordInfo',
		method: 'get',
		params
	})
}
export function audit(data) {
	return request({
		url: '/memberData/audit',
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

export default {
	recordInfo,
	memberChange,
	audit,
	lock,
	playerAuditList,
	blackList,
	memberLoginLog,
	editBlackList,
	delBlackList,
	addBlackList
}
