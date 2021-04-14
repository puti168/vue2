import request from '@/utils/request'

export function fetchCardRepertorys(query) {
	return request({
		url: '/cardRepertory/discard',
		method: 'POST',
		params: query
	})
}
export function fetchDiscard(query) {
	return request({
		// GET /cardRepertory/getCardRepertorys
		url: '/cardRepertory/getCardRepertorys',
		method: 'get',
		params: query
	})
}
export function fetchPackRecord(query) {
	return request({
		url: '/shuffleCardsRecord/getShuffleCardsRecordList',
		method: 'get',
		params: query
	})
}
export function fetchOpRecord(query) {
	return request({
		url: '/system/operationLogList',
		method: 'get',
		params: query
	})
}
export function postOutbound(query) {
	const urls = ['outbound', 'inbound', 'discard']
	return request({
		url: `/cardRepertory/${urls[query.type]}`,
		method: 'POST',
		data: query
	})
}
export function postWarnCard(query) {
	// https://stackoverflow.com/questions/47630163/axios-post-request-to-send-form-data
	return request({
		url: '/cardBoxStatus/cardWarningEdit',
		method: 'POST',
		data: query
	})
}
export function modifyPwd(data) {
	return request({
		url: '/system/modifySelfPassword',
		method: 'POST',
		data
	})
}

export function googleAuth(params) {
	return request({
		url: '/user/googleAuth',
		method: 'get',
		params
	})
}

export function getWarningList(params) {
	return request({
		url: '/cardBoxStatus/getWarningList',
		method: 'get',
		params
	})
}

export function cardWarningEdit(data) {
	return request({
		url: '/cardBoxStatus/cardWarningEdit',
		method: 'POST',
		data
	})
}

export function shuffleCardlist(params) {
	return request({
		url: '/cardBoxStatus/shuffleCardlist',
		method: 'get',
		params
	})
}

export function shuffleAdd(data) {
	return request({
		url: '/cardBoxStatus/addShuffle',
		method: 'POST',
		data
	})
}

export function shuffleDel(data) {
	return request({
		url: '/cardBoxStatus/delShuffleById',
		method: 'POST',
		data
	})
}

export function saveLanguage(data) {
	return request({
		url: '/system/saveLanguage',
		method: 'POST',
		data
	})
}

export function delLanguage(data) {
	return request({
		url: '/system/delLanguage',
		method: 'POST',
		data
	})
}

export default {
	modifyPwd
}
