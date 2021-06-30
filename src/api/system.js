import request from '@/utils/request'
// 系统===》参数字典
export function getkvconfigQueryList(params) {
	return request({
		url: '/kvconfig/queryList',
		method: 'get',
		params
	})
}

export default {
    getkvconfigQueryList
}
