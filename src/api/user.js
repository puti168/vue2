import request from '@/utils/request'

export function login(data) {
	return request({
		url: '/login',
		method: 'post',
		data: {
			...data,
			type: 1
		}
	})
}

export function getDics() {
	return request({
		url: '/dict/getAllDictList',
		method: 'get'
	})
}
export function logout() {
	return request({
		url: '/logout',
		method: 'post'
	})
}
export function updateXPSStatus(data) {
	return request({
		url: '/user/updateUserStatus',
		method: 'post',
		data
	})
}
export function modifyPassword(data) {
	return request({
		url: '/user/updatePassword',
		method: 'post',
		data
	})
}
export function getUsers(data) {
	return request({
		url: '/user/listPage',
		method: 'post',
		data
	})
}
// 字典列表选择框
export function getSecurityDictList(params) {
	return request({
		url: '/securityDict/list',
		method: 'get',
		params
	})
}
// 设置用户字典
export function setUserSecurityDict(data) {
	return request({
		url: '/securityDict/setUserDicts',
		method: 'post',
		data
	})
}
// 角色列表
export function getRoleList(data) {
	return request({
		url: '/role/listPage',
		method: 'post',
		data
	})
}
// 用户明细
export function getUserRoles(data) {
	return request({
		url: '/user/getUserDetailInfo',
		method: 'post',
		data
	})
}

// 会员管理==> 会员列表
export function memberListAPI(data) {
	return request({
		url: '/user/queryMember',
		method: 'post',
		data
	})
}

// 会员管理==> 会员列表 ===> 风控层级
export function merchantDictAPI(params) {
	return request({
		url: '/member/merchantDict',
		method: 'get',
		params
	})
}

// 会员管理==> 会员列表 ==> 导出
export function exportExcelAPI(data) {
	return request({
		url: '/member/download',
		method: 'post',
		responseType: 'blob',
		data
	})
}

// 会员管理==> 新增
export function addMemberAPI(data) {
	return request({
		url: '/player/addPlayer',
		method: 'post',
		data
	})
}

// 会员管理==> 会员注册信息 ==> 列表
export function memberRegisterInfoListAPI(data) {
	return request({
		url: '/member/memberRegisterList',
		method: 'post',
		data
	})
}

// 会员管理==> 会员银行记录 ==> 列表
export function bankRecordListAPI(data) {
	return request({
		url: '/bankOperateRecord/page',
		method: 'post',
		data
	})
}

// 编辑用户
export function editUser(data) {
	return request({
		url: '/user/updateUserInfo',
		method: 'post',
		data
	})
}
// 新增用户
export function addUser(data) {
	return request({
		url: '/user/add',
		method: 'post',
		data
	})
}
// 查询会员银行卡管理和会员虚拟币账号管理
export function getListUserBankAndVirtual(data) {
	return request({
		url: '/management/listUserBankAndVirtual',
		method: 'post',
		data
	})
}
// 修改会员银行卡管理和会员虚拟币账号管理 解绑状态
export function setUpdateUserBankAndVirtualBindStatus(data) {
	return request({
		url: '/management/updateUserBankAndVirtualBindStatus',
		method: 'post',
		data
	})
}
// 修改会员银行卡管理和会员虚拟币账号管理 开启/禁用状态
export function setUpdateUserBankAndVirtualStatus(data) {
	return request({
		url: '/management/updateUserBankAndVirtualStatus',
		method: 'post',
		data
	})
}
export function memberDataInfoChangeRecord(data) {
	return request({
		url: '/memberData/infoChangeRecord',
		method: 'post',
		data
	})
}
// 会员标签分页查询
export function getMemberPageLabel(data) {
	return request({
		url: '/member/pageLabel',
		method: 'post',
		data
	})
}
// 会员标签-新增（编辑）
export function setMemberAddOrEditMemberLabel(data) {
	return request({
		url: '/member/addOrEditMemberLabel',
		method: 'post',
		data
	})
}
// 会员标签-标签人数-会员信息
export function getMemberMemberInfoByLabelId(data) {
	return request({
		url: '/member/memberInfoByLabelId',
		method: 'post',
		data
	})
}
// 会员标签-删除
export function setMemberDeleteLabel(params) {
	return request({
		url: '/member/deleteLabel',
		method: 'get',
		params
	})
}
// 会员标签-变更记录分页查询
export function getMemberLabelChangeRecordPage(data) {
	return request({
		url: '/member/getMemberLabelChangeRecordPage',
		method: 'post',
		data
	})
}

export default {
	login,
	logout,
	getUsers,
	addUser,
	editUser,
	getUserRoles,
	memberDataInfoChangeRecord,
	getRoleList,
	modifyPassword,
	getSecurityDictList,
	setUserSecurityDict,
	updateXPSStatus,
	memberListAPI,
	merchantDictAPI,
	exportExcelAPI,
	addMemberAPI,
	memberRegisterInfoListAPI,
	bankRecordListAPI,
	getListUserBankAndVirtual,
	setUpdateUserBankAndVirtualBindStatus,
	setUpdateUserBankAndVirtualStatus,
	getMemberPageLabel,
	setMemberAddOrEditMemberLabel,
	getMemberMemberInfoByLabelId,
	setMemberDeleteLabel,
	getMemberLabelChangeRecordPage
}
