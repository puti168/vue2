import request from '@/utils/request'

// 代理==> 代理管理 ===> 代理列表
export function AgentListAPI(data) {
	return request({
		url: '/proxyInformationRegistered/proxyRegisteredList',
		method: 'post',
		data
	})
}

// 代理==> 代理管理 ===> 代理列表导出
export function agentListExportAPI(data) {
	return request({
		url: '/proxyInformationRegistered/download',
		method: 'post',
		data,
		responseType: 'blob'
	})
}

// 代理管理==> 代理列表 ===> 风控层级
export function agentDictAPI(params) {
	return request({
		url: '/proxyInformationRegistered/proxyDict',
		method: 'get',
		params
	})
}

// 代理==> 代理管理 ===> 新增代理
export function addAgentAPI(data) {
	return request({
		url: '/proxy/addProxy',
		method: 'post',
		data
	})
}

// 代理==> 代理管理 ===> 会员转代
export function memberTransAgentAPI(data) {
	return request({
		url: '/memberTransfer/apply',
		method: 'post',
		data
	})
}

// 代理==> 代理管理 ===> 代理注册信息
export function agentRegisterInfoAPI(data) {
	return request({
		url: '/proxyInformationRegistered/proxyList',
		method: 'post',
		data
	})
}
// 溢出审核
export function listOverflowMember(data) {
	return request({
		url: '/memberOverflow/listOverflowMember',
		method: 'post',
		data
	})
}
export function lockMemberAuditRecordProxy(data) {
	return request({
		url: '/memberOverflow/lockMemberAuditRecord',
		method: 'post',
		data
	})
}
export function memberOverflowDetail(data) {
	return request({
		url: '/memberOverflow/memberOverflowDetail',
		method: 'post',
		data
	})
}
export function updateMemberOverflowRecord(data) {
	return request({
		url: '/memberOverflow/updateMemberOverflowRecord',
		method: 'post',
		data
	})
}
export function overflowMemberInfo(data) {
	return request({
		url: '/memberOverflow/overflowMemberInfo',
		method: 'post',
		data
	})
}
export function addOverflowMember(data) {
	return request({
		url: '/memberOverflow/addOverflowMember',
		method: 'post',
		data
	})
}
// 代理==> 代理管理 ===> 代理银行卡记录
export function agentBankRecordAPI(data) {
	return request({
		url: '/bankProxyRecord/bankRecord',
		method: 'post',
		data
	})
}

// 代理==> 代理管理 ===> 代理虚拟币记录
export function agentVirtualRecordAPI(data) {
	return request({
		url: '/bankProxyRecord/virtualRecord',
		method: 'post',
		data
	})
}

// 代理==>  ===> 代理详情查询
export function getProxyDetailQueryDetail(data) {
	return request({
		url: '/proxyDetail/queryDetail',
		method: 'post',
		data
	})
}

// 代理详情-基本信息-信息编辑
export function setProxyDataInfoEdit(data) {
	return request({
		url: '/proxyData/infoEdit',
		method: 'post',
		data
	})
}

// 代理详情-代理备注信息分页
export function getProxyDetailRemark(data) {
	return request({
		url: '/proxyDetail/remark',
		method: 'post',
		data
	})
}

// 代理详情-余额查询接口
export function getProxyDataBalance(data) {
	return request({
		url: '/proxyDetail/balance',
		method: 'post',
		data
	})
}

// 代理详情-佣金信息
export function getProxyDataCommission(data) {
	return request({
		url: '/proxyDetail/commission',
		method: 'post',
		data
	})
}

// 代理详情-存提信息
export function getRechargeAndWithdrawInfo(data) {
	return request({
		url: '/proxyDetail/rechargeAndWithdrawInfo',
		method: 'post',
		data
	})
}

// 代理详情-代存信息
export function getProxyDetailProxyRechargeInfo(data) {
	return request({
		url: '/proxyDetail/ProxyRechargeInfo',
		method: 'post',
		data
	})
}

// 代理详情-团队成员概览
export function getProxyDetailTeamInfo(data) {
	return request({
		url: '/proxyDetail/teamInfo',
		method: 'post',
		data
	})
}
// 代理详情-团队成员投注信息
export function getProxyDetailTeamBet(data) {
	return request({
		url: '/proxyDetail/teamBet',
		method: 'post',
		data
	})
}
// 代理详情-top3投注，输赢
export function getProxyDetailTop3Bet(data) {
	return request({
		url: '/proxyDetail/top3Bet',
		method: 'post',
		data
	})
}
// 代理详情-登录日志，登录信息
export function getProxyDetailProxyLoginLog(data) {
	return request({
		url: '/proxyDetail/proxyLoginLog',
		method: 'post',
		data
	})
}
// 代理详情-代理信息变更记录 分页查询
export function getProxyDataInfoChangeRecord(data) {
	return request({
		url: '/proxyData/infoChangeRecord',
		method: 'post',
		data
	})
}

// 代理==> 代理推广 ===> 代理图片列表
export function agentPictureListAPI(data) {
	return request({
		url: '/materialImage/select',
		method: 'post',
		data
	})
}

// 代理==> 代理推广 ===> 代理图片删除
export function agentPictureListDeleteAPI(data) {
	return request({
		url: '/materialImage/delete',
		method: 'post',
		data
	})
}

// 代理==> 代理推广 ===> 代理图片新增
export function agentPictureListCreateAPI(data) {
	return request({
		url: '/materialImage/insert',
		method: 'post',
		data
	})
}

// 代理==> 代理推广 ===> 代理图片修改
export function agentPictureListUpdateAPI(data) {
	return request({
		url: '/materialImage/update',
		method: 'post',
		data
	})
}
export function agentImageUploadAPI(data, cb) {
	return request({
		url: '/materialImage/upload',
		method: 'post',
		data,
		cb
	})
}

//  推广管理-推广域名管理-删除推广域名管理
export function setDomainDelete(data) {
	return request({
		url: '/obPromoteDomain/delete',
		method: 'post',
		data
	})
}
//  推广管理-推广域名管理-新增推广域名管理
export function addDomainInsert(data) {
	return request({
		url: '/obPromoteDomain/insert',
		method: 'post',
		data
	})
}
//  推广管理-推广域名管理-分页查询推广域名管理
export function getDomainSelect(data) {
	return request({
		url: '/obPromoteDomain/select',
		method: 'post',
		data
	})
}
//  推广管理-推广域名管理-修改推广域名管理
export function setDomainUpdate(data) {
	return request({
		url: '/obPromoteDomain/update',
		method: 'post',
		data
	})
}
//  等级福利配置-分页查询代理等级管理
export function getProxyGradesSelect(data) {
	return request({
		url: '/proxyGrade/select',
		method: 'post',
		data
	})
}
//  等级福利配置-删除代理等级管理
export function setProxyGradeDelete(data) {
	return request({
		url: '/proxyGrade/delete',
		method: 'post',
		data
	})
}
//  等级福利配置-新增代理等级管理
export function setProxyGradeInsert(data) {
	return request({
		url: '/proxyGrade/insert',
		method: 'post',
		data
	})
}
//  等级福利配置-修改代理等级管理
export function setProxyGradeUpdate(data) {
	return request({
		url: '/proxyGrade/update',
		method: 'post',
		data
	})
}
//  等级福利配置-分页查询代理返佣等级管理
export function getProxyCommissionSelect(data) {
	return request({
		url: '/proxyCommission/select',
		method: 'post',
		data
	})
}
//  等级福利配置-删除代理返佣等级管理
export function setProxyCommissionDelete(data) {
	return request({
		url: '/proxyCommission/delete',
		method: 'post',
		data
	})
}
//  等级福利配置-新增代理返佣等级管理
export function setProxyCommissionInsert(data) {
	return request({
		url: '/proxyCommission/insert',
		method: 'post',
		data
	})
}
//  等级福利配置-修改代理返佣等级管理
export function setProxyCommissionUpdate(data) {
	return request({
		url: '/proxyCommission/update',
		method: 'post',
		data
	})
}
//  代理标签变更记录
export function getProxyGetLabelChangeRecordPage(data) {
	return request({
		url: '/proxy/getLabelChangeRecordPage',
		method: 'post',
		data
	})
}
//  代理标签
export function getProxyPageLabel(data) {
	return request({
		url: '/proxy/pageLabel',
		method: 'post',
		data
	})
}
//  代理标签==>新增
export function getProxyAddLabel(data) {
	return request({
		url: '/proxy/addLabel',
		method: 'post',
		data
	})
}
//  代理标签==>删除
export function setProxyDeleteLabel(params) {
	return request({
		url: '/proxy/deleteLabel',
		method: 'get',
		params
	})
}
//  代理标签==>标签人数
export function getProxyProxyInfoByLabelId(data) {
	return request({
		url: '/proxy/proxyInfoByLabelId',
		method: 'post',
		data
	})
}
//  代理标签==>代理详情下拉框
export function getProxyLabelDict(params) {
	return request({
		url: '/proxy/labelDict',
		method: 'get',
		params
	})
}
//  代理标签==>分页查询代理操作记录
export function getProxyOperateSelect(data) {
	return request({
		url: '/proxyOperate/select',
		method: 'post',
		data
	})
}

export default {
	updateMemberOverflowRecord,
	overflowMemberInfo,
	addOverflowMember,
	memberOverflowDetail,
	lockMemberAuditRecordProxy,
	listOverflowMember,
	AgentListAPI,
	agentListExportAPI,
	agentDictAPI,
	addAgentAPI,
	memberTransAgentAPI,
	agentRegisterInfoAPI,
	agentBankRecordAPI,
	agentVirtualRecordAPI,
	getProxyDetailQueryDetail,
	agentPictureListAPI,
	agentImageUploadAPI,
	agentPictureListDeleteAPI,
	agentPictureListCreateAPI,
	agentPictureListUpdateAPI,
	setProxyDataInfoEdit,
	getProxyDetailRemark,
	getProxyDataBalance,
	getProxyDataCommission,
	getRechargeAndWithdrawInfo,
	getProxyDetailProxyRechargeInfo,
	getProxyDetailTeamInfo,
	getProxyDetailTeamBet,
	getProxyDetailTop3Bet,
	getProxyDetailProxyLoginLog,
	getProxyDataInfoChangeRecord,
	setDomainDelete,
	addDomainInsert,
	getDomainSelect,
	setDomainUpdate,
	getProxyGradesSelect,
	setProxyGradeDelete,
	setProxyGradeInsert,
	setProxyGradeUpdate,
	getProxyCommissionSelect,
	setProxyCommissionDelete,
	setProxyCommissionInsert,
	setProxyCommissionUpdate,
	getProxyGetLabelChangeRecordPage,
	getProxyPageLabel,
	getProxyAddLabel,
	setProxyDeleteLabel,
	getProxyProxyInfoByLabelId,
	getProxyLabelDict,
	getProxyOperateSelect
}
