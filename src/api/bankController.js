import request from '@/utils/request'

export function getQueryBank(data) {
	return request({
		url: '/bank/queryBank',
		method: 'post',
		data
	})
}
export function setAddBank(data) {
	return request({
		url: '/bank/insertBank',
		method: 'post',
		data
	})
}
export function setDeleteBank(data) {
	return request({
		url: '/bank/deleteBank',
		method: 'post',
		data
	})
}
export function setEidteBank(data) {
	return request({
		url: '/bank/updateBank',
		method: 'post',
		data
	})
}
