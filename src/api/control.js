import request from '@/utils/request'

export function getSelectWindControlLevel(data) {
	return request({
		url: '/windControlRecord/selectWindControlLevel',
		method: 'post',
		data
	})
}
export function selectWindControlRecord(data) {
	return request({
		url: '/windControlRecord/selectWindControlRecord',
		method: 'post',
		data
	})
}

export default {
	getSelectWindControlLevel,
	selectWindControlRecord
}
