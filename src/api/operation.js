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
		url: '/operate/startPage/add',
		method: 'post',
		data
	})
}

// 运营 ===> 启动页配置 ==> 修改
export function clientStartUpdateAPI(data) {
	return request({
		url: '/operate/startPage/update',
		method: 'post',
		data
	})
}

// 运营 ===> 启动页配置 ==> 删除
export function clientStartDeleteAPI(data) {
	return request({
		url: '/operate/startPage/delete',
		method: 'post',
		data
	})
}

// 运营 ===> 启动页配置 ==> 启用禁用
export function clientStartUseAPI(data) {
	return request({
		url: '/operate/startPage/use',
		method: 'post',
		data
	})
}

// 运营 ===> 启动页配置 ==> 文件上传
export function clientStartUploadAPI(data, cb) {
	return request({
		url: '/uploadFile/image',
		method: 'post',
		data,
		cb
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
// 运营==>公告配置==>查询所有公告配置
export function getOperateConfigAnnouncementSelectAll(data) {
	return request({
		url: '/operate/obConfigAnnouncement/selectAll',
		method: 'post',
		data
	})
}
// 运营==>公告配置==>查询单个公告配置
export function getOperateConfigAnnouncementSelect(data) {
	return request({
		url: '/operate/obConfigAnnouncement/select',
		method: 'post',
		data
	})
}
// 运营==>公告配置==>保存公告配置
export function getOperateConfigAnnouncementSave(data) {
	return request({
		url: '/operate/obConfigAnnouncement/save',
		method: 'post',
		data
	})
}
// 运营==>公告配置==>删除公告配置
export function getOperateConfigAnnouncementDelete(data) {
	return request({
		url: '/operate/obConfigAnnouncement/delete',
		method: 'post',
		data
	})
}
// 运营==>公告配置==>修改公告状态
export function getOperateConfigAnnouncementStatus(data) {
	return request({
		url: '/operate/obConfigAnnouncement/status',
		method: 'post',
		data
	})
}
// 运营==>活动，通知消息配置==>查询全部活动，通知配置
export function getOperateConfigNoticeSelectAll(data) {
	return request({
		url: '/operate/obConfigNotice/selectAll',
		method: 'post',
		data
	})
}
// 运营==>活动，通知消息配置==>查询单个活动，通知配置
export function getOperateConfigNoticeSelect(data) {
	return request({
		url: '/operate/obConfigNotice/select',
		method: 'post',
		data
	})
}
// 运营==>活动，通知消息配置==>保存，修改活动，通知配置
export function getOperateConfigNoticeSave(data) {
	return request({
		url: '/operate/obConfigNotice/save',
		method: 'post',
		data
	})
}
// 运营==>活动，通知消息配置==>活动，通知  撤回
export function getOperateConfigNoticeRetract(data) {
	return request({
		url: '/operate/obConfigNotice/retract',
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
// 运营 ===>场馆配置管理 ==>操作记录
export function getOperateObMerchantGameRecordSelect(data) {
	return request({
		url: '/operate/obMerchantGameRecord/select',
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
	getOperateConfigAnnouncementSelectAll,
	getOperateConfigAnnouncementSelect,
	getOperateConfigAnnouncementSave,
	getOperateConfigAnnouncementDelete,
	getOperateConfigAnnouncementStatus,
	getOperateConfigNoticeSelectAll,
	getOperateConfigNoticeSelect,
	getOperateConfigNoticeSave,
	getOperateConfigNoticeRetract,
	clientStartAddAPI,
	clientStartUpdateAPI,
	clientStartDeleteAPI,
	clientStartUseAPI,
	clientStartUploadAPI,
	getOperateObMerchantGameRecordSelect
}
