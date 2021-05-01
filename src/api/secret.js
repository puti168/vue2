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
		url: '/recordInfo',
		method: 'get',
		params
	})
}
export function memberChange(params) {
	return request({
		url: '/page',
		method: 'get',
		params
	})
}
export function lock(params) {
	return request({
		url: '/lock',
		method: 'get',
		params
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
	lock,
	blackList,
	memberLoginLog,
	editBlackList,
	delBlackList,
	addBlackList
}
