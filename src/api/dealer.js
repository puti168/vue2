import request from '@/utils/request'

export function fetchList(query) {
	return request({
		url: '/dealer/selectDealerInfo',
		method: 'get',
		params: query
	})
}

/**
 * 列举派彩自动核对局.0=未校对 1=已完成
 * @param {列举派彩自动核对局.0=未校对 1=已完成} query
 */
export function listBettingRecordCountChecker(query) {
	return request({
		url: '/monitor/listBettingRecordCountChecker',
		method: 'get',
		params: query
	})
}
/**
 * 分页查询派彩自动核对单量
 * @param {分页查询派彩自动核对单量} query
 */
export function pageBettingRecordCountChecker(query) {
	return request({
		url: '/monitor/pageBettingRecordCountChecker',
		method: 'get',
		params: query
	})
}

export function fetchAll(query) {
	return request({
		url: '/dealer/listDealers',
		method: 'get',
		params: query
	})
}
export function updatePassword(query) {
	return request({
		url: '/dealer/updatePassword',
		method: 'POST',
		data: query
	})
}
export function updateStatus(data) {
	return request({
		url: '/dealer/updateStatus',
		method: 'POST',
		data
	})
}
export function updateInfo(data) {
	return request({
		url: '/dealer/updateDealerInfo',
		method: 'POST',
		data
	})
}
export function dealerUserGameManageCreate(query) {
	// https://stackoverflow.com/questions/47630163/axios-post-request-to-send-form-data
	return request({
		url: '/dealer/save',
		method: 'POST',
		data: query
		// params: {
		// 	data: query
		// }
		// headers: { 'Content-Type': 'multipart/form-data' }
	})
}
