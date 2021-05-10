import request from '@/utils/request'

// 游戏配置==> 游戏分类管理 ===> 分页列表
export function gameAssortListAPI(data) {
	return request({
		url: '/gameAssort/query',
		method: 'post',
		data
	})
}

export default {
	gameAssortListAPI
}
