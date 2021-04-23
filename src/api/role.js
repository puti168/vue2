import request from '@/utils/request'

export function getUserPermissions(params) {
	return request({
		url: '/role/permissions',
		method: 'GET',
		params
	})
}
