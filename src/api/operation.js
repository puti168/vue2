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
		url: '/operate/obConfigAnnouncementRecord/select',
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

// 运营 ===> 活动类型 ==> 弹框列表
export function activityQueryTypeListAPI(params) {
	return request({
		url: '/operate/configActivityType/queryTypeList',
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

// 活动类型名称配置操作记录
export function queryActivityTypeList(data) {
	return request({
		url: '/operate/ActivityConfigRecord/queryActivityTypeList',
		method: 'post',
		data
	})
}

// 优惠类型页签操作记录
export function queryDiscountTagList(data) {
	return request({
		url: '/operate/ActivityConfigRecord/queryDiscountTagList',
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
// 按banner区域排序
export function setoperateConfigBannerSort(data) {
	return request({
		url: '/operate/configBanner/sort',
		method: 'post',
		data
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
// vip活动配置/赞助活动配置 ==> 查询分页列表
export function getOperateActivityVipQueryList(data) {
	return request({
		url: '/operate/activityVip/queryList',
		method: 'post',
		data
	})
}
// vip活动配置/赞助活动配置 ==> 获取已创建的活动
export function getOperateActivityVipQueryActivityNameList(params) {
	return request({
		url: '/operate/activityVip/queryActivityNameList',
		method: 'get',
		params
	})
}
// vip活动配置/赞助活动配置 ==> 新增
export function setOperateActivityVipAdd(data) {
	return request({
		url: '/operate/activityVip/add',
		method: 'post',
		data
	})
}
// vip活动配置/赞助活动配置 ==> 删除
export function setOperateActivityVipDelete(data) {
	return request({
		url: '/operate/activityVip/delete',
		method: 'post',
		data
	})
}
// vip活动配置/赞助活动配置 ==> 修改
export function setOperateActivityVipUpdate(data) {
	return request({
		url: '/operate/activityVip/update',
		method: 'post',
		data
	})
}
// vip活动配置/赞助活动配置 ==> 启用,禁用
export function setOperateActivityVipUse(data) {
	return request({
		url: '/operate/activityVip/use',
		method: 'post',
		data
	})
}
// vip活动配置/赞助活动配置 ==> 排序
export function setOperateActivityVipSort(data) {
	return request({
		url: '/operate/activityVip/sort',
		method: 'post',
		data
	})
}
// 查询banner区域
export function operateConfigBannerQueryGameList(params) {
	return request({
		url: '/operate/configBanner/queryGameList',
		method: 'get',
		params
	})
}
// vip活动配置/赞助活动配置 ==> 排序
export function setUserInfoupdatePwdAdmin(data) {
	return request({
		url: '/userInfo/updatePwdAdmin',
		method: 'post',
		data
	})
}
// 优惠活动配置 ==> 查询列表
export function getOperateDiscountActivityQueryList(data) {
	return request({
		url: '/operate/discountActivity/queryList',
		method: 'post',
		data
	})
}
// 优惠活动配置 ==> 获取已创建的活动id，名称
export function getOperateDiscountActivityQueryActivityNameList(params) {
	return request({
		url: '/operate/discountActivity/queryActivityNameList',
		method: 'get',
		params
	})
}
// 优惠活动配置 ==> 获取页签下的所有活动
export function getOperateDiscountActivityQueryActivityNameListByTag(params) {
	return request({
		url: '/operate/discountActivity/queryActivityNameListByTag',
		method: 'get',
		params
	})
}
// 优惠活动配置 ==> 新增
export function setOperateDiscountActivityAdd(data) {
	return request({
		url: '/operate/discountActivity/add',
		method: 'post',
		data
	})
}
// 优惠活动配置 ==> 删除
export function setOperateDiscountActivityDelete(data) {
	return request({
		url: '/operate/discountActivity/delete',
		method: 'post',
		data
	})
}
// 优惠活动配置 ==> 排序
export function setOperateDiscountActivitySort(data) {
	return request({
		url: '/operate/discountActivity/sort',
		method: 'post',
		data
	})
}
// 优惠活动配置 ==> 修改
export function setOperateDiscountActivityUpdate(data) {
	return request({
		url: '/operate/discountActivity/update',
		method: 'post',
		data
	})
}
// 优惠活动配置 ==> 启用、禁用
export function setOperateDiscountActivityUse(data) {
	return request({
		url: '/operate/discountActivity/use',
		method: 'post',
		data
	})
}
// 排序
export function setoperateConfigDiscountTagSort(data) {
	return request({
		url: '/operate/configDiscountTag/sort',
		method: 'post',
		data
	})
}
// 查询排序后banner区域
export function operatecCnfigBannerQuerySortedBannerArea(params) {
	return request({
		url: '/operate/configBanner/querySortedBannerArea',
		method: 'get',
		params
	})
}
// 创建页签
export function operateConfigDiscountTagQuerySortedNames(params) {
	return request({
		url: '/operate/configDiscountTag/querySortedNames',
		method: 'get',
		params
	})
}
// 分页查询代理操作记录
export function proxyOperate(data) {
	return request({
		url: '/proxyOperate/select',
		method: 'post',
		data
	})
}
// 教程名称配置-查询详情
export function configTutorNameQueryDetail(data) {
	return request({
		url: '/operate/configTutorName/queryDetail',
		method: 'post',
		data
	})
}
// 教程名称配置-查询所有教程名称
export function configTutorNameQueryTutorList(data) {
	return request({
		url: '/operate/configTutorName/queryTutorList',
		method: 'post',
		data
	})
}
// 教程名称配置-查询排序后类型
export function configTutorNameQueryTypeList(params) {
	return request({
		url: '/operate/configTutorName/queryTypeList',
		method: 'get',
		params
	})
}

// 教程名称下拉框
export function operateConfigTutorNameQueryTypeList(params) {
	return request({
		url: '/operate/configTutorName/queryTypeList',
		method: 'get',
		params
	})
}

// 教程名称配置-删除
export function configTutorNameDelete(data) {
	return request({
		url: '/operate/configTutorName/delete',
		method: 'post',
		data
	})
}
// 教程名称配置-保存
export function configTutorNameSave(data) {
	return request({
		url: '/operate/configTutorName/save',
		method: 'post',
		data
	})
}

// 教程内容状态下拉框
export function configTutorContentQuerySortedNames(data) {
	return request({
		url: '/configTutorContent/querySortedNames',
		method: 'post',
		data
	})
}

// 教程名称配置-排序
export function configTutorNameSort(data) {
	return request({
		url: '/operate/configTutorName/sort',
		method: 'post',
		data
	})
}
// 教程内容配置分页查询
export function getConfigTutorContentQueryList(data) {
	return request({
		url: '/configTutorContent/queryList',
		method: 'post',
		data
	})
}

// 教程名称配置-启用、禁用
export function configTutorNameUse(data) {
	return request({
		url: '/operate/configTutorName/use',
		method: 'post',
		data
	})
}

// 教程内容配置启用，禁用
export function getConfigTutorContentUse(data) {
	return request({
		url: '/configTutorContent/use',
		method: 'post',
		data
	})
}

// 教程页签配置-删除页签配置
export function bookmarkDeleteBookmark(data) {
	return request({
		url: '/bookmark/deleteBookmark',
		method: 'post',
		data
	})
}
// 教程内容配置删除
export function getConfigTutorContentDelete(data) {
	return request({
		url: '/configTutorContent/delete',
		method: 'post',
		data
	})
}

// 教程页签配置-新增页签配置
export function bookmarkInsertBookmark(data) {
	return request({
		url: '/bookmark/insertBookmark',
		method: 'post',
		data
	})
}
// 教程内容配置新增
export function getConfigTutorContentInsert(data) {
	return request({
		url: '/configTutorContent/insert',
		method: 'post',
		data
	})
}

// 教程页签配置-查询分页列表
export function bookmarkQueryList(data) {
	return request({
		url: '/bookmark/queryList',
		method: 'post',
		data
	})
}
// 教程内容配置修改
export function getConfigTutorContentUpdate(data) {
	return request({
		url: '/configTutorContent/update',
		method: 'post',
		data
	})
}
// 教程页签配置-获取已创建的页签+状态--排序展示
export function bookmarkQuerySortedNames(data) {
	return request({
		url: '/bookmark/querySortedNames',
		method: 'post',
		data
	})
}
// 教程内容配置排序
export function getConfigTutorContentSort(data) {
	return request({
		url: '/configTutorContent/sort',
		method: 'post',
		data
	})
}

// 教程页签配置-排序
export function bookmarkSort(data) {
	return request({
		url: '/bookmark/sort',
		method: 'post',
		data
	})
}
// 教程页签配置-页签配置修改
export function updateBookmark(data) {
	return request({
		url: '/bookmark/updateBookmark',
		method: 'post',
		data
	})
}
// 教程页签配置-启用、禁用
export function bookmarkUse(data) {
	return request({
		url: '/bookmark/use',
		method: 'post',
		data
	})
}
// 教程变更记录==>变更目录下拉框
export function getOperateObConfigTutorRecordQueryTutorEnums(params) {
	return request({
		url: '/operate/obConfigTutorRecord/queryTutorEnums',
		method: 'get',
		params
	})
}
// 教程变更记录==>变更类型下拉框
export function getOperateObConfigTutorRecordQueryAllEnums(params) {
	return request({
		url: '/operate/obConfigTutorRecord/queryAllEnums',
		method: 'get',
		params
	})
}
// 教程变更记录分页查询
export function getOperateObConfigTutorRecordSelect(data) {
	return request({
		url: '/operate/obConfigTutorRecord/select',
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
	activityQueryTypeListAPI,
	activitySortAPI,
	activityUpdateAPI,
	getOperateObMerchantGameRecordSelect,
	getQperateConfigBannerQueryBannerList,
	getOperateConfigBannerUse,
	getOperateConfigBannerDelete,
	getPperateConfigBannerUpdate,
	getOperateConfigBannerAdd,
	operateConfigBannerQueryBannerAreaAPI,
	setoperateConfigBannerSort,
	operateConfigClientRecordQueryEnumsAPI,
	getOperateConfigClientRecordQueryRecordList,
	getOperateObConfigNoticeSelectAll,
	getFeedBackPageFeedBack,
	OperateObConfigAnnouncementRecordQueryFeedBackEnums,
	getOperateActivityVipQueryList,
	getOperateActivityVipQueryActivityNameList,
	setOperateActivityVipAdd,
	setOperateActivityVipDelete,
	setOperateActivityVipUpdate,
	setOperateActivityVipUse,
	setOperateActivityVipSort,
	operateConfigBannerQueryGameList,
	setUserInfoupdatePwdAdmin,
	getOperateDiscountActivityQueryList,
	getOperateDiscountActivityQueryActivityNameList,
	getOperateDiscountActivityQueryActivityNameListByTag,
	setOperateDiscountActivityAdd,
	setOperateDiscountActivityDelete,
	setOperateDiscountActivitySort,
	setOperateDiscountActivityUpdate,
	setOperateDiscountActivityUse,
	setoperateConfigDiscountTagSort,
	operatecCnfigBannerQuerySortedBannerArea,
	operateConfigDiscountTagQuerySortedNames,
	proxyOperate,
	configTutorNameQueryDetail,
	configTutorNameQueryTutorList,
	configTutorNameQueryTypeList,
	configTutorNameDelete,
	configTutorNameSave,
	configTutorNameSort,
	configTutorNameUse,
	bookmarkDeleteBookmark,
	bookmarkInsertBookmark,
	bookmarkQueryList,
	bookmarkQuerySortedNames,
	bookmarkSort,
	updateBookmark,
	bookmarkUse,
	operateConfigTutorNameQueryTypeList,
	configTutorContentQuerySortedNames,
	getConfigTutorContentQueryList,
	getConfigTutorContentUse,
	getConfigTutorContentDelete,
	getConfigTutorContentInsert,
	getConfigTutorContentUpdate,
	getConfigTutorContentSort,
	getOperateObConfigTutorRecordQueryTutorEnums,
	getOperateObConfigTutorRecordQueryAllEnums,
	getOperateObConfigTutorRecordSelect
}
