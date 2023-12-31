import request from '@/utils/request'

// 会员盈亏报表==>会员盈亏列表和小计(分页)
export function getReportMembernetamountList(params) {
	return request({
		url: '/report/membernetamount/list',
		method: 'get',
		params
	})
}
// 会员盈亏报表==>会员盈亏总计
export function getReportMembernetamountAggregation(params) {
	return request({
		url: '/report/membernetamount/aggregation',
		method: 'get',
		params
	})
}
// 会员盈亏报表==>会员盈亏总计
export function getReportMembernetamountDetail(params) {
	return request({
		url: '/report/membernetamount/detail',
		method: 'get',
		params
	})
}
// 场馆盈亏报表==>分页查询场馆盈亏列表
export function getReportVenueNetAmountDayListPage(data) {
	return request({
		url: '/report/venueNetAmountDay/listPage',
		method: 'post',
		data
	})
}
// 场馆盈亏报表==>场馆盈亏总计
export function getReportVenueNetAmountDaySummary(data) {
	return request({
		url: '/report/venueNetAmountDay/summary',
		method: 'post',
		data
	})
}
// 场馆盈亏报表==>分页查询场馆盈亏详情列表
export function getReportVenueNetAmountDayDetailListPage(data) {
	return request({
		url: '/report/venueNetAmountDay/detailListPage',
		method: 'post',
		data
	})
}
// 游戏盈亏报表==>分页查询游戏盈亏列表
export function getReportGameProfitListPage(data) {
	return request({
		url: '/report/gameProfit/listPage',
		method: 'post',
		data
	})
}
// 游戏盈亏报表==>游戏盈亏总计
export function getReportGameProfitSummary(data) {
	return request({
		url: '/report/gameProfit/summary',
		method: 'post',
		data
	})
}
// 游戏盈亏报表==>分页查询游戏盈亏详情列表
export function getReportGameProfitDetailListPage(data) {
	return request({
		url: '/report/gameProfit/detailListPage',
		method: 'post',
		data
	})
}
// 游戏盈亏报表==>根据场馆查询游戏
export function getGameManagerSelectGameByPlatform(params) {
	return request({
		url: '/gameManager/selectGameByPlatform',
		method: 'get',
		params
	})
}
// 客户端盈亏报表==>客户端盈亏列表(分页)
export function getDevicetypenetamountList(params) {
	return request({
		url: '/report/devicetypenetamount/list',
		method: 'get',
		params
	})
}
// 客户端盈亏报表==>客户端盈亏详情(分页)
export function getDevicetypenetamountDetail(params) {
	return request({
		url: '/report/devicetypenetamount/detail',
		method: 'get',
		params
	})
}
// 客户端盈亏报表==>客户端盈亏总计
export function getDevicetypenetamountAggregation(params) {
	return request({
		url: '/report/devicetypenetamount/aggregation',
		method: 'get',
		params
	})
}
// 每日盈亏报表==>每日盈亏列表和小计(分页)
export function getReportDaynetamountList(params) {
	return request({
		url: '/report/daynetamount/list',
		method: 'get',
		params
	})
}
// 每日盈亏报表==>每日盈亏总计
export function getReportDaynetamountAggregation(params) {
	return request({
		url: '/report/daynetamount/aggregation',
		method: 'get',
		params
	})
}
// 会员报表==>会员报表列表(分页)
export function getReportPlayerReportLlistPage(data) {
	return request({
		url: '/report/playerReport/listPage',
		method: 'post',
		data
	})
}
// 会员报表==>会员报表总计
export function getReportPlayerReportSummary(data) {
	return request({
		url: '/report/playerReport/summary',
		method: 'post',
		data
	})
}
// 会员报表==>会员报表详情(分页)
export function getReportPlayerReportDetailListPage(data) {
	return request({
		url: '/report/playerReport/detailListPage',
		method: 'post',
		data
	})
}

// 存取报表==>分页查询存取报表列表
export function getReportAccessAmountDayListPage(data) {
	return request({
		url: '/report/accessAmountDay/listPage',
		method: 'post',
		data
	})
}
// 存取报表==>存取报表总计
export function getReportAccessAmountDaySummary(data) {
	return request({
		url: '/report/accessAmountDay/summary',
		method: 'post',
		data
	})
}
// 综合报表==>综合报表列表(分页)
export function getReportIntegratereportList(params) {
	return request({
		url: '/report/integratereport/list',
		method: 'get',
		params
	})
}
// 综合报表==>综合报表总计
export function getReportIntegratereportAggregation(params) {
	return request({
		url: '/report/integratereport/aggregation',
		method: 'get',
		params
	})
}
// 佣金报表==>佣金报表列表(分页)
export function getReportCommissionList(params) {
	return request({
		url: '/report/commission/list',
		method: 'get',
		params
	})
}
// 佣金报表==>佣金报表总计
export function getReportCommissionAggregation(params) {
	return request({
		url: '/report/commission/aggregation',
		method: 'get',
		params
	})
}
// 佣金报表==>佣金报表详情(分页)
export function getReportCommissionDetail(params) {
	return request({
		url: '/report/commission/detail',
		method: 'get',
		params
	})
}
// 转账报表==>分页查询转账报表列表
export function getReportTransferAmountListPage(data) {
	return request({
		url: '/report/transferAmount/listPage',
		method: 'post',
		data
	})
}
// 转账报表==>转账报表总计
export function getReportTransferAmountSummary(data) {
	return request({
		url: '/report/transferAmount/summary',
		method: 'post',
		data
	})
}
// 新增会员留存报表列表==>分页查询新增会员留存报表列表
export function getReportNewMemberRetentionDay(data) {
	return request({
		url: '/report/newMemberRetentionDay/listPage',
		method: 'post',
		data
	})
}

export default {
	getReportMembernetamountList,
	getReportMembernetamountAggregation,
	getReportMembernetamountDetail,
	getReportVenueNetAmountDayListPage,
	getReportVenueNetAmountDaySummary,
	getReportVenueNetAmountDayDetailListPage,
	getReportGameProfitListPage,
	getReportGameProfitSummary,
	getReportGameProfitDetailListPage,
	getGameManagerSelectGameByPlatform,
	getDevicetypenetamountList,
	getDevicetypenetamountDetail,
	getDevicetypenetamountAggregation,
	getReportDaynetamountList,
	getReportDaynetamountAggregation,
	getReportPlayerReportLlistPage,
	getReportPlayerReportSummary,
	getReportPlayerReportDetailListPage,
	getReportAccessAmountDayListPage,
	getReportAccessAmountDaySummary,
	getReportIntegratereportList,
	getReportIntegratereportAggregation,
	getReportCommissionList,
	getReportCommissionAggregation,
	getReportCommissionDetail,
	getReportTransferAmountListPage,
	getReportTransferAmountSummary,
	getReportNewMemberRetentionDay
}
