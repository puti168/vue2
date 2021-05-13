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

export default {
	gameAssortListAPI,
	queryChildGameAPI,
	gameDeleteAPI
}
