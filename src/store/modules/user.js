import { login, logout } from '@/api/user'
import Cookies from 'js-cookie'
import {
	getToken,
	setToken,
	removeToken,
	setUsername,
	setId,
	setNickName,
	clearCookie
} from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
	token: getToken(),
	roles: [],
	rolesIds: [],
	name: '',
	username: '',
	nickName: '',
	id: '',
	avatar: '',
	datas: {},
	userInfo: {}
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_ID: (state, token) => {
		state.id = token
	},
	SET_NAME: (state, name) => {
		state.nickName = name
	},
	SET_ACCOUNT: (state, name) => {
		state.username = name
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles
	},
	SET_ROLES_IDS: (state, rolesIds) => {
		state.rolesIds = rolesIds
	},
	SET_USER_INFO: (state, info) => {
		state.userInfo = { ...info }
	},
	SET_DATA: (state, datas) => {
		if (datas) {
			state.datas = datas
		}

		const { countryType, gametype } = state.datas
		if (Cookies.get('language') === 'en') {
			state.datas.countryType = countryType.map((i) => {
				return { ...i, type: i.englishText }
			})
			state.datas.gametype = gametype.map((i) => {
				return { ...i, type: i.englishText }
			})
		}
		if (Cookies.get('language') === 'zh') {
			state.datas.countryType = countryType.map((i) => {
				return { ...i, type: i.text }
			})
			state.datas.gametype = gametype.map((i) => {
				return { ...i, type: i.text }
			})
		}
	}
}

const actions = {
	// user login
	login({ commit }, userInfo) {
		const { username, password, vaildCode } = userInfo
		return new Promise((resolve, reject) => {
			login({ loginName: username.trim(), loginPassword: password, vaildCode })
				.then(() => {
					const data = {
						token: '123456',
						userInfo: { username: '666666', nickName: '888888', id: 66, agentId: 2 }
					}
					commit('SET_TOKEN', data.token)
					commit('SET_ACCOUNT', data.userInfo.username)
					commit('SET_NAME', data.userInfo.nickName)
					commit('SET_ID', data.userInfo.id)
					commit('SET_USER_INFO', data.userInfo)
					setToken(data.token)
					setId(data.userInfo.id)
					setUsername(data.userInfo.username)
					setNickName(data.userInfo.nickName)
					resolve(data)
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	// user logout
	logout({ commit, state }) {
		return new Promise((resolve, reject) => {
			logout(state.token)
				.then(() => {
					commit('SET_TOKEN', '')
					removeToken()
					console.log('clearCookie :>> ', clearCookie)
					clearCookie()
					resetRouter()
					resolve()
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	// remove token
	resetToken({ commit }) {
		return new Promise((resolve) => {
			commit('SET_TOKEN', '')
			clearCookie()
			removeToken()
			resolve()
		})
	},
	getRoles({ commit }) {
		// return getUserPermissions().then((response) => {
		// 	const data = response.status === 203 ? [] : response.data
		// 	const result = []
		// 	loop(data, result)
		// 	commit('SET_ROLES', data)
		// 	commit('SET_ROLES_IDS', result)
		// 	return response.data
		// })
	},
	getDataDic({ commit }) {
		// return getDataDic().then((res) => {
		// 	console.log('getDataDic :', res)
		// 	commit('SET_DATA', res.data)
		// })
	},
	changeDataLanguage({ commit }) {
		return new Promise((resolve) => {
			commit('SET_DATA', null)
			resolve()
		})
	}
}

// function loop(data, result) {
// 	if (!data || data.length === 0) return []

// 	data.forEach((i) => {
// 		result.push(i.id)
// 		if (i.children && i.children.length > 0) {
// 			loop(i.children, result)
// 		}
// 	})
// }

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
