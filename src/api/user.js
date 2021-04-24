import request from '@/utils/request'

export function login(data) {
	return request({
		url: '/login',
		method: 'post',
		data: {
			...data,
			type: 1
		}
	})
}

export function logout() {
	return request({
		url: '/logout',
		method: 'post'
	})
}

// 会员管理==> 会员列表
export function memberList(data) {
	return request({
		url: '/user/queryMember',
		method: 'post',
		data
	})
}

export default {
	login,
	logout,
	memberList
}
