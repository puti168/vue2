import request from '@/utils/request'

// 游戏配置==> 游戏分类管理 ===> 分页列表
export function gameAssortListAPI(data) {
	return request({
		url: '/gameAssort/query',
		method: 'post',
		data
	})
}

// 游戏配置==> 游戏分类管理 ===> 子游戏分页查询
export function queryChildGamePageAPI(data) {
	return request({
		url: '/gameAssort/queryChildrenGamePage',
		method: 'post',
		data
	})
}

// 游戏配置==> 游戏分类管理 ===> 子游戏查询
export function queryChildGameAPI(data) {
	return request({
		url: '/gameAssort/queryChildrenGame',
		method: 'post',
		data
	})
}

// 游戏配置==> 游戏分类管理 ===> 子游戏配置
export function queryChildGameConfigAPI(params) {
	return request({
		url: '/gameAssort/queryChildrenGame',
		method: 'get',
		params
	})
}
// 游戏配置==> 游戏分类管理 ===> 删除
export function gameDeleteAPI(data) {
	return request({
		url: '/gameAssort/delete',
		method: 'post',
		data
	})
}

// 游戏配置==> 游戏分类管理 ===> 编辑
export function gameUpdateAPI(data) {
	return request({
		url: '/gameAssort/update',
		method: 'post',
		data
	})
}

// 游戏配置==> 游戏分类管理 ===> 编辑
export function gameUpdateStatusAPI(data) {
	return request({
		url: '/gameAssort/updateStatus',
		method: 'post',
		data
	})
}

// 游戏配置==> 游戏分类管理 ===> 创建
export function gameCreateAPI(data) {
	return request({
		url: '/gameAssort/create',
		method: 'post',
		data
	})
}

// 游戏配置==> 游戏分类管理 ===>游戏平台查询
export function queryGameAPI(data) {
	return request({
		url: '/gameAssort/queryGame',
		method: 'post',
		data
	})
}

//  游戏标签管理 ===> 表格查询
export function getTabelData(data) {
	return request({
		url: '/obGameLabel/select',
		method: 'post',
		data
	})
}
//  游戏标签管理 ===> 新增游戏标签管理
export function addObGameLabel(data) {
	return request({
		url: '/obGameLabel/insert',
		method: 'post',
		data
	})
}
//  游戏标签管理 ===> 已标签游戏查询
export function getGameLabelRelation(data) {
	return request({
		url: '/obGameLabel/getGameLabelRelation',
		method: 'post',
		data
	})
}
//  游戏标签管理 ===> 修改游戏标签 状态
export function setUpdateStatus(data) {
	return request({
		url: '/obGameLabel/updateStatus',
		method: 'post',
		data
	})
}
//  游戏标签管理 ===> 修改游戏标签管理
export function setUpdateLabel(data) {
	return request({
		url: '/obGameLabel/update',
		method: 'post',
		data
	})
}
//  游戏标签管理 ===> 删除游戏标签管理
export function setUpdateDelete(data) {
	return request({
		url: '/obGameLabel/delete',
		method: 'post',
		data
	})
}
//  游戏注单 ===> 游戏平台
export function getMerchantGameGamePlant(data) {
	return request({
		url: '/merchantGame/gamePlant',
		method: 'post',
		data
	})
}
//  游戏注单 ===> 游戏注单分页
export function getGameRecordNotes(data) {
	return request({
		url: '/gameRecord/notes',
		method: 'post',
		data
	})
}
//  游戏注单 ===> 游戏注单列表导出
export function getGameRecordDownload(data) {
	return request({
		url: '/gameRecord/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}
//  游戏注单 ===> 获取注单明细
export function getGameRecordDetail(data) {
	return request({
		url: '/gameRecord/detail',
		method: 'post',
		data
	})
}
//  游戏搜索管理 ===> 游戏搜索日志
export function getGameSearchLog(data) {
	return request({
		url: '/gameSearchLog/selectLog',
		method: 'post',
		data
	})
}

// 游戏配置==> 游戏搜索管理 ===> 列表
export function gameSearchListAPI(data) {
	return request({
		url: '/obSearchConfig/select',
		method: 'post',
		data
	})
}

// 游戏配置==> 游戏搜索管理 ===> 新增
export function gameSearchCreateAPI(data) {
	return request({
		url: '/obSearchConfig/insert',
		method: 'post',
		data
	})
}

// 游戏配置==> 游戏搜索管理 ===> 修改
export function gameSearchUpdateAPI(data) {
	return request({
		url: '/obSearchConfig/save',
		method: 'post',
		data
	})
}

// 游戏配置==> 游戏搜索管理 ===> 删除
export function gameSearchDeleteAPI(data) {
	return request({
		url: '/obSearchConfig/delete',
		method: 'post',
		data
	})
}
export function gameLabelList(data) {
	return request({
		url: '/gameManager/gameLabelList',
		method: 'post',
		data
	})
}
export function gameModuleNameList(data) {
	return request({
		url: '/gameManager/gameModuleNameList',
		method: 'post',
		data
	})
}
export function addGame(data) {
	return request({
		url: '/gameManager/addGame',
		method: 'post',
		data
	})
}
export function editGame(data) {
	return request({
		url: '/gameManager/editGame',
		method: 'post',
		data
	})
}
export function imageUpload(data) {
	return request({
		url: '/gameManager/upload',
		method: 'post',
		data,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}
export function editGameStatus(data) {
	return request({
		url: '/gameManager/editStatus',
		method: 'post',
		data
	})
}
export function gameManageDetail(data) {
	return request({
		url: '/gameManager/gameManageDetail',
		method: 'post',
		data
	})
}
export function gamePlant(data) {
	return request({
		url: '/merchantGame/gamePlant',
		method: 'post',
		data
	})
}

// 游戏配置==> 游戏搜索管理 ===> 删除
export function gameList(data) {
	return request({
		url: '/gameManager/gameList',
		method: 'post',
		data
	})
}

export default {
	gameAssortListAPI,
	gameList,
	editGame,
	addGame,
	editGameStatus,
	imageUpload,
	gameModuleNameList,
	gamePlant,
	gameManageDetail,
	gameLabelList,
	queryChildGamePageAPI,
	queryChildGameAPI,
	queryChildGameConfigAPI,
	gameDeleteAPI,
	gameUpdateAPI,
	gameCreateAPI,
	queryGameAPI,
	gameUpdateStatusAPI,
	getTabelData,
	addObGameLabel,
	getGameLabelRelation,
	setUpdateStatus,
	setUpdateLabel,
	setUpdateDelete,
	getMerchantGameGamePlant,
	getGameRecordNotes,
	getGameRecordDownload,
	getGameRecordDetail,
	getGameSearchLog,
	gameSearchListAPI,
	gameSearchCreateAPI,
	gameSearchUpdateAPI,
	gameSearchDeleteAPI
}
