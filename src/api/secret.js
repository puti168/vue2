import request from '@/utils/request'

export function blackList(params) {
	return request({
		url: '/bankBlack/list',
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
	memberChange,
	blackList,
	editBlackList,
	delBlackList,
	addBlackList
}
