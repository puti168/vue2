import request from '@/utils/request'

// 运营 ===> 公共资源配置
export function clientCommonAPI(data) {
	return request({
		url: '/user/queryMember',
		method: 'post',
		data
	})
}

// 运营 ===> 启动页配置 ==> 列表
export function clientStartListAPI(data) {
	return request({
		url: '/user/queryMember',
		method: 'post',
		data
	})
}

export default {
	clientCommonAPI,
	clientStartListAPI
}
