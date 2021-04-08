import request from '@/utils/request'

export function getDevice(params) {
	return request({
		url: '/device/list',
		method: 'GET',
		params
	})
}
export function addDevice(data) {
	return request({
		url: '/device/add',
		method: 'POST',
		data
	})
}
export function editDevice(data) {
	return request({
		url: '/device/edit',
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
