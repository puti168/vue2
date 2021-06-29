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

// 运营 ===> 场馆费率 ==> 配置查询
export function platformSelectAPI(data) {
	return request({
		url: '/operate/obMerchantGame/select',
		method: 'post',
		data
	})
}

// 运营 ===> 场馆费率 ==> 更新配置
export function platformUpdateAPI(data) {
	return request({
		url: '/operate/obMerchantGame/update',
		method: 'post',
		data
	})
}

// 运营 ===> 公告配置 ==> 操作记录枚举
export function activityInfoLogAPI(params) {
	return request({
		url: '/operate/obConfigAnnouncementRecord/queryEnums',
		method: 'get',
		params
	})
}

// 运营 ===> 公告配置 ==> 操作记录列表
export function activityInfoLogListAPI(data) {
	return request({
		url: '/operate/obConfigAnnouncementRecord/queryEnums',
		method: 'post',
		data
	})
}

// 运营 ===> 活动类型 ==> 详情
export function activityTypeDetailAPI(params) {
	return request({
		url: '/operate/configActivityType/queryDetail',
		method: 'get',
		params
	})
}

// 运营 ===> 活动类型 ==> 排序
export function activitySortAPI(data) {
	return request({
		url: '/operate/configActivityType/sort',
		method: 'post',
		data
	})
}

// 运营 ===> 活动类型 ==> 更新
export function activityUpdateAPI(data) {
	return request({
		url: '/operate/configActivityType/update',
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
export function getOperateConfigNoticeSelectDetail(data) {
	return request({
		url: '/operate/obConfigNoticeDetail/selectDetail',
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
// 运营 ===>客户端配置管理 ==>查询banner列表
export function getQperateConfigBannerQueryBannerList(data) {
	return request({
		url: '/operate/configBanner/queryBannerList',
		method: 'post',
		data
	})
}
export function getOperateConfigBannerUse(data) {
	return request({
		url: '/operate/configBanner/use',
		method: 'post',
		data
	})
}
export function getOperateConfigBannerDelete(data) {
	return request({
		url: '/operate/configBanner/delete',
		method: 'post',
		data
	})
}

// 修改banner
export function getPperateConfigBannerUpdate(data) {
	return request({
		url: '/operate/configBanner/update',
		method: 'post',
		data
	})
}
// 新增banner
export function getOperateConfigBannerAdd(data) {
	return request({
		url: '/operate/configBanner/add',
		method: 'post',
		data
	})
}
// 查询banner区域
export function operateConfigBannerQueryBannerAreaAPI(params) {
	return request({
		url: '/operate/configBanner/queryBannerArea',
		method: 'get',
		params
	})
}
// 客户端配置管理操作记录=》查询
export function operateConfigClientRecordQueryEnumsAPI(params) {
	return request({
		url: '/operate/ConfigClientRecord/queryEnums',
		method: 'get',
		params
	})
}
// 客户端配置管理操作记录==>查询操作记录列表
export function getOperateConfigClientRecordQueryRecordList(data) {
	return request({
		url: '/operate/ConfigClientRecord/queryRecordList',
		method: 'post',
		data
	})
}
// 活动消息配置
export function getOperateObConfigNoticeSelectAll(data) {
	return request({
		url: '/operate/obConfigNotice/selectAll',
		method: 'post',
		data
	})
}
// 会员意见反馈
export function getFeedBackPageFeedBack(data) {
	return request({
		url: '/feedBack/pageFeedBack',
		method: 'post',
		data
	})
}
// 会员意见反馈===>反馈类型
export function OperateObConfigAnnouncementRecordQueryFeedBackEnums(params) {
	return request({
		url: '/operate/obConfigAnnouncementRecord/queryFeedBackEnums',
		method: 'get',
		params
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
	getOperateConfigNoticeSelectDetail,
	getOperateConfigNoticeSave,
	getOperateConfigNoticeRetract,
	clientStartAddAPI,
	clientStartUpdateAPI,
	clientStartDeleteAPI,
	clientStartUseAPI,
	clientStartUploadAPI,
	platformSelectAPI,
	platformUpdateAPI,
	activityInfoLogAPI,
	activityInfoLogListAPI,
	activityTypeDetailAPI,
	activitySortAPI,
	activityUpdateAPI,
	getOperateObMerchantGameRecordSelect,
	getQperateConfigBannerQueryBannerList,
	getOperateConfigBannerUse,
	getOperateConfigBannerDelete,
	getPperateConfigBannerUpdate,
	getOperateConfigBannerAdd,
	operateConfigBannerQueryBannerAreaAPI,
	operateConfigClientRecordQueryEnumsAPI,
	getOperateConfigClientRecordQueryRecordList,
	getOperateObConfigNoticeSelectAll,
	getFeedBackPageFeedBack,
	OperateObConfigAnnouncementRecordQueryFeedBackEnums

}
