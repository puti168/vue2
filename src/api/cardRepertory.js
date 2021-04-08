import request from '@/utils/request'

export function fetchCardRepertorys(query) {
	return request({
		url: '/cardRepertory/discard',
		method: 'POST',
		params: query
	})
}
export function fetchDiscard(query) {
	return request({
		url: '/cardRepertory/getCardRepertorys',
		method: 'get',
		params: query
	})
}
export function fetchDiscardList(query) {
	return request({
		url: '/discardRecord/list',
		method: 'get',
		params: query
	})
}
export function fetchCardBoxStatusList(query) {
	return request({
		url: '/cardBoxStatus/list',
		method: 'get',
		params: query
	})
}
export function fetchShuffleCardList(query) {
	return request({
		url: '/cardBoxStatus/shuffleCardlist',
		method: 'get',
		params: query
	})
}
export function discardRecord(query) {
	return request({
		url: '/discardRecord/sysDiscard',
		method: 'get',
		params: query
	})
}
export function fetchPackRecord(query) {
	return request({
		url: '/shuffleCardsRecord/getShuffleCardsRecordList',
		method: 'get',
		params: query
	})
}
export function fetchShuffleType(query) {
	return request({
		url: '/shuffleCardsRecord/getShuffleTypeList',
		method: 'get',
		params: query
	})
}
export function postOutbound(query) {
	const urls = ['inbound', 'outbound', 'discard']
	return request({
		url: `/cardRepertory/${urls[query.type]}`,
		method: 'POST',
		data: query
	})
}
export function postWarnCard(query) {
	return request({
		url: '/cardBoxStatus/cardWarningEdit',
		method: 'POST',
		data: query
	})
}
export function postEditShuffle(data) {
	return request({
		url: '/cardBoxStatus/shuffleTypeEdit',
		method: 'POST',
		data
	})
}

/**
 * 查询所有接口的请求量，图表用
 * @param {*} query
 */
export function apiAccessCounter(query) {
	return request({
		url: '/monitor/apiAccessCounter',
		method: 'get',
		params: query
	})
}

/**
 * 查询所有接口的请求量，图表用
 * @param {*} query
 */
export function apiAccessCounterReport(query) {
	return request({
		url: '/monitor/apiAccessCounterReport',
		method: 'get',
		params: query
	})
}

/**
 * 分页查询所有接口的请求量
 * @param {*} query
 */
export function pageApiAccessCounter(query) {
	return request({
		url: '/monitor/pageApiAccessCounter',
		method: 'get',
		params: query
	})
}

export function pageApiAccessCounterDetail(query) {
	return request({
		url: '/monitor/pageApiAccessCounterDetail',
		method: 'get',
		params: query
	})
}

export function interfaceList(query) {
	return request({
		url: '/monitor/interfaceList',
		method: 'get',
		params: query
	})
}
export function listApiAccessCounterMulti(query) {
	return request({
		url: '/monitor/listApiAccessCounterMulti',
		method: 'get',
		params: query
	})
}
