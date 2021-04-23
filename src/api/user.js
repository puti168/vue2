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

export default {
	login,
	logout
}
