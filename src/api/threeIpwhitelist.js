import request from '@/utils/request'

// 添加三方支付白名单
export function thirdPayWhiteAdd(data) {
	return request({
		url: '/thirdPayWhite/add',
		method: 'post',
		data
	})
}
// 删除三方支付白名单
export function thirdPayWhiteDelete(data) {
	return request({
		url: '/thirdPayWhite/del',
		method: 'post',
		data
	})
}

// 编辑三方支付白名单
export function thirdPayWhiteEidt(data) {
	return request({
		url: '/thirdPayWhite/edit',
		method: 'post',
		data
	})
}
// 查询三方支付白名单列表
export function thirdPayWhiteList(params) {
	return request({
		url: '/thirdPayWhite/list',
		method: 'get',
		params
	})
}
export default {
	thirdPayWhiteAdd,
	thirdPayWhiteDelete,
	thirdPayWhiteEidt,
	thirdPayWhiteList
}
