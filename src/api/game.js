import request from '@/utils/request'

// 游戏配置==> 游戏分类管理 ===> 分页列表
export function gameAssortListAPI(data) {
	return request({
		url: '/gameAssort/query',
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

// 游戏配置==> 游戏分类管理 ===> 创建
export function gameCreateAPI(data) {
	return request({
		url: '/gameAssort/create',
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
		url: '/obSearchConfig/update',
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

export default {
	gameAssortListAPI,
	queryChildGameAPI,
	gameDeleteAPI,
	gameUpdateAPI,
	gameCreateAPI,
	gameSearchCreateAPI,
	gameSearchUpdateAPI,
	gameSearchDeleteAPI
}
