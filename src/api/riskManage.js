import request from '@/utils/request'

// 风控==> 终端登录限制管理列表
export function ipBlackList(params) {
	return request({
		url: '/ipBlack/list',
		method: 'get',
		params
	})
}

// 风控==> 查询单个黑名单IP
export function ipBlackSingle(params) {
	return request({
		url: '/ipBlack/list',
		method: 'post',
		params
	})
}

// 风控==> 添加黑名单IP
export function ipBlackAdd(data) {
	return request({
		url: '/ipBlack/add',
		method: 'post',
		data
	})
}

// 风控==> 编辑黑名单IP
export function ipBlackEdit(data) {
	return request({
		url: '/ipBlack/edit',
		method: 'post',
		data
	})
}

// 风控==> 删除黑名单IP
export function ipBlackDelete(id) {
	return request({
		url: `/ipBlack/del/${id}`,
		method: 'post'
	})
}

export default {
	ipBlackList,
	ipBlackSingle,
	ipBlackAdd,
	ipBlackEdit,
	ipBlackDelete
}
