import request from '@/utils/request'

// 运营 ===> 公共资源配置 ==> 提交
export function clientCommonUpdateAPI(data) {
	return request({
		url: '/operate/publicResources/update',
		method: 'post',
		data
	})
}

// 运营 ===> 公共资源配置 ==> 切换查询详情信息
export function clientCommonQueryByTypeAPI(params) {
	return request({
		url: '/operate/publicResources/queryByType',
		method: 'get',
		params
	})
}

// 运营 ===> 公共资源配置 ==> 切换查询详情信息
export function clientCommonQueryPublicResourcesAPI(params) {
	return request({
		url: '/operate/publicResources/queryPublicResources',
		method: 'get',
		params
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
	clientCommonUpdateAPI,
	clientCommonQueryByTypeAPI,
	clientCommonQueryPublicResourcesAPI,
	clientStartListAPI
}
