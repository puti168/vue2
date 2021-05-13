import request from '@/utils/request'

// 游戏配置==> 游戏分类管理 ===> 分页列表
export function gameAssortListAPI(data) {
	return request({
		url: '/gameAssort/query',
		method: 'post',
		data
	})
}

// 游戏配置==> 游戏分类管理 ===> 包含子游戏查询
export function queryChildGameAPI(data) {
	return request({
		url: '/gameAssort/queryChildrenGame',
		method: 'post',
		data
	})
}

// 游戏配置==> 游戏分类管理 ===> 游戏分类删除
export function gameDeleteAPI(data) {
	return request({
		url: '/gameAssort/delete',
		method: 'post',
		data
	})
}

// 游戏配置==> 游戏分类管理 ===> 游戏分类编辑
export function gameUpdateAPI(data) {
	return request({
		url: '/gameAssort/update',
		method: 'post',
		data
	})
}

// 游戏配置==> 游戏分类管理 ===> 游戏分类创建
export function gameCreateAPI(data) {
	return request({
		url: '/gameAssort/create',
		method: 'post',
		data
	})
}

export default {
	gameAssortListAPI,
	queryChildGameAPI,
	gameDeleteAPI,
	gameUpdateAPI,
	gameCreateAPI
}
