import request from '@/utils/request'

export function getWhiteIp(params) {
	return request({
		url: '/system/ipwhitelist',
		method: 'GET',
		params
	})
}
export function delWhiteIp(data) {
	return request({
		url: '/system/deleteIpWhite',
		method: 'POST',
		data
	})
}

export function addWhiteIp(data) {
	return request({
		url: '/system/createIpWhite',
		method: 'post',
		data
	})
}

export function uploadWhiteIp(data) {
	return request({
		url: '/system/uploadCSV',
		method: 'post',
		data
	})
}
export function downloadWhiteTemplate() {
	return request({
		url: '/system/downloadTemplate',
		method: 'GET'
	})
}
