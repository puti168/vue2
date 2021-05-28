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

// 风控==> 创建风控层级 ===> 列表
export function riskRankListAPI(data) {
	return request({
		url: '/windControllerLevel/windControllerLevelList',
		method: 'post',
		data
	})
}

// 风控==> 创建风控层级 ===> 新增
export function createRiskRankAPI(data) {
	return request({
		url: '/windControllerLevel/windControllerLevelSave',
		method: 'post',
		data
	})
}

// 风控==> 创建风控层级 ===> 修改
export function updateRiskRankAPI(data) {
	return request({
		url: '/windControllerLevel/windControllerLevelUpdate',
		method: 'post',
		data
	})
}

// 风控==> 创建风控层级 ===> 删除
export function deleteRiskRankAPI(data) {
	return request({
		url: '/windControllerLevel/windControllerLevelDelete',
		method: 'post',
		data
	})
}

// 风控==> 编辑风控层级 ===> 列表
export function riskDictAPI(params) {
	return request({
		url: '/windControllerLevel/dict',
		method: 'get',
		params
	})
}

export default {
	getSelectWindControlLevel,
	selectWindControlRecord,
	riskRankListAPI,
	createRiskRankAPI,
	updateRiskRankAPI,
	deleteRiskRankAPI,
	riskDictAPI
}
