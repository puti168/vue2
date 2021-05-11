import request from '@/utils/request'

// 代理==> 代理管理 ===> 新增代理
export function addAgentAPI(data) {
	return request({
		url: '/gameAssort/query',
		method: 'post',
		data
	})
}

export default {
	addAgentAPI
}
