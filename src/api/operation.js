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
		url: '/operate/startPage/queryList',
		method: 'post',
		data
	})
}

// 运营 ===> 启动页配置 ==> 新增
export function clientStartAddAPI(data) {
	return request({
		url: '/operate/startPage/queryList',
		method: 'post',
		data
	})
}

// 运营 ===> 启动页配置 ==> 修改
export function clientStartUpdateAPI(data) {
	return request({
		url: '/operate/startPage/queryList',
		method: 'post',
		data
	})
}

// 运营 ===> 启动页配置 ==> 删除
export function clientStartDeleteAPI(data) {
	return request({
		url: '/operate/startPage/queryList',
		method: 'post',
		data
	})
}

// 运营 ===> 启动页配置 ==> 启用禁用
export function clientStartUseAPI(data) {
	return request({
		url: '/operate/startPage/queryList',
		method: 'post',
		data
	})
}

export function configDiscountTagQueryList(data) {
	return request({
		url: '/operate/configDiscountTag/queryList',
		method: 'post',
		data
	})
}
export function configDiscountTagUse(data) {
	return request({
		url: '/operate/configDiscountTag/use',
		method: 'post',
		data
	})
}
export function configDiscountTagDelete(data) {
	return request({
		url: '/operate/configDiscountTag/delete',
		method: 'post',
		data
	})
}
export function configDiscountTagAdd(data) {
	return request({
		url: '/operate/configDiscountTag/add',
		method: 'post',
		data
	})
}
export function configDiscountTagEdit(data) {
	return request({
		url: '/operate/configDiscountTag/update',
		method: 'post',
		data
	})
}

export function configDiscountTagQueryNames(params) {
	return request({
		url: '/operate/configDiscountTag/queryNames',
		method: 'get',
		params
	})
}
export function queryActivityTypeList(data) {
	return request({
		url: '/operate/ActivityConfigRecord/queryActivityTypeList',
		method: 'post',
		data
	})
}
export function queryDiscountActivityList(data) {
	return request({
		url: '/operate/ActivityConfigRecord/queryDiscountActivityList',
		method: 'post',
		data
	})
}
export function queryDiscountTagList(data) {
	return request({
		url: '/operate/ActivityConfigRecord/queryDiscountTagList',
		method: 'post',
		data
	})
}
export function queryVipActivityList(data) {
	return request({
		url: '/operate/ActivityConfigRecord/queryVipActivityList',
		method: 'post',
		data
	})
}
export default {
	queryDiscountTagList,
	queryVipActivityList,
	queryDiscountActivityList,
	queryActivityTypeList,
	configDiscountTagQueryNames,
	configDiscountTagEdit,
	configDiscountTagAdd,
	configDiscountTagQueryList,
	configDiscountTagDelete,
	configDiscountTagUse,
	clientCommonUpdateAPI,
	clientCommonQueryByTypeAPI,
	clientCommonQueryPublicResourcesAPI,
	clientStartListAPI,
	clientStartAddAPI,
	clientStartUpdateAPI,
	clientStartDeleteAPI,
	clientStartUseAPI
}
