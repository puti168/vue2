import request from '@/utils/request'

export function fetchWaterSign(query) {
	return request({
		url: '/waterSign/getWaterSignUnionTables',
		method: 'get',
		params: query
	})
}
export function fetchWaterSignRecords(query) {
	return request({
		url: '/waterSign/getWaterSignRecords',
		method: 'get',
		params: query
	})
}
/**
 * 查询拉单情况.时间精确到小时.yyyyMMddHH。图表用
 * @param {*} query
 */
export function listApiPullCounter(query) {
	return request({
		url: '/monitor/listApiPullCounter',
		method: 'get',
		params: query
	})
}
/**
 * 分页查询拉单情况.时间精确到小时.yyyyMMddHH
 * @param {*} query
 */
export function pageApiPullCounter(query) {
	return request({
		url: '/monitor/pageApiPullCounter',
		method: 'get',
		params: query
	})
}

export function pageAgentLastRedisList(query) {
	return request({
		url: '/monitor/pageAgentLastRedisList',
		method: 'get',
		params: query
	})
}

export function pageAgentNoList(query) {
	return request({
		url: '/monitor/pageAgentNoList',
		method: 'get',
		params: query
	})
}

export function pageAgentMissCount(query) {
	return request({
		url: '/monitor/pageAgentMissCount',
		method: 'get',
		params: query
	})
}

// 分页查询拉单详细参数情况.时间精确到秒，13位数时间戳
export function pagePullRecordInfo(query) {
	return request({
		url: '/monitor/pagePullRecordInfo',
		method: 'get',
		params: query
	})
}

export function pageAgentLastRedisCount(query) {
	return request({
		url: '/monitor/pageAgentLastRedisCount',
		method: 'get',
		params: query
	})
}
export function getThreadPoolInfo(query) {
	return request({
		url: '/bett/record/getThreadPoolInfo',
		method: 'get',
		params: query
	})
}
export function getSettleTableStatus(query) {
	return request({
		url: '/bett/record/getSettleTableStatus',
		method: 'get',
		params: query
	})
}
export function pushKafka(query) {
	return request({
		url: '/bett/record/pushKafka',
		method: 'get',
		params: query
	})
}
export function pushKafkaByGroup(query) {
	return request({
		url: '/bett/record/pushKafkaByGroup',
		method: 'get',
		params: query
	})
}
export function pushKafkaChange(query) {
	return request({
		url: '/bett/record/pushKafkaChange',
		method: 'get',
		params: query
	})
}
export function againSettle(query) {
	return request({
		url: '/bett/record/againSettle',
		method: 'get',
		params: query
	})
}
export function doSettleTablesStatusId(query) {
	return request({
		url: '/bett/record/doSettleTablesStatusId',
		method: 'get',
		params: query
	})
}
export function doSettleTablesStatusReset21(query) {
	return request({
		url: '/bett/record/doSettleTablesStatusReset21',
		method: 'get',
		params: query
	})
}
export function doSettleTablesStatusId21(query) {
	return request({
		url: '/bett/record/doSettleTablesStatusId21',
		method: 'POST',
		data: query
	})
}
export function doSettleTablesStatusReset(query) {
	return request({
		url: '/bett/record/doSettleTablesStatusReset',
		method: 'get',
		params: query
	})
}
export function settleBetIds(query) {
	return request({
		url: '/bett/record/settleBetIds',
		method: 'get',
		params: query
	})
}
export function listAll(params) {
	return request({
		url: '/currency/listAll',
		method: 'get',
		params
	})
}
export function region(params) {
	return request({
		url: '/agent/region',
		method: 'get',
		params
	})
}
export function agentLoginRegion(params) {
	return request({
		url: '/agent/agentLoginRegion',
		method: 'get',
		params
	})
}
export function pageSingleWalletCallbackNotice(query) {
	return request({
		url: '/monitor/pageSingleWalletCallbackNotice',
		method: 'post',
		data: query
	})
}
export function noticeBetPointActivityConfigChange(query) {
	return request({
		url: '/monitor/noticeBetPointActivityConfigChange',
		method: 'get',
		params: query
	})
}
export function updateSingleWalletCallbackNotice(query) {
	return request({
		url: '/monitor/updateSingleWalletCallbackNotice',
		method: 'get',
		params: query
	})
}
export function refreshConfig(query) {
	return request({
		url: '/monitor/refreshConfig',
		method: 'post',
		data: query
	})
}

export function fetchGameTypes(query) {
	return request({
		url: '/waterSign/getAllGameTables',
		method: 'get',
		params: query
	})
}
export function postUniteTable(data) {
	return request({
		url: '/waterSign/unionTable',
		method: 'post',
		data
	})
}
