import { login, getDics, logout } from '@/api/user'
import { getUserPermissions } from '@/api/role'
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
import md5 from 'js-md5'

const state = {
	token: getToken(),
	roles: [],
	rolesIds: [],
	name: '',
	username: '',
	nickName: '',
	id: '',
	avatar: '',
	globalDics: {},
	datas: {}
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_GLABALDICS: (state, dics) => {
		state.globalDics = dics
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
	SET_DATA: (state, datas) => {
		if (datas) {
			state.datas = datas
		}

		const { countryType, gametype } = state.datas
		if (Cookies.get('language') === 'en') {
			state.datas.countryType = countryType.map((i) => {
				return {
					...i,
					type: i.englishText
				}
			})
			state.datas.gametype = gametype.map((i) => {
				return {
					...i,
					type: i.englishText
				}
			})
		}
		if (Cookies.get('language') === 'zh') {
			state.datas.countryType = countryType.map((i) => {
				return {
					...i,
					type: i.text
				}
			})
			state.datas.gametype = gametype.map((i) => {
				return {
					...i,
					type: i.text
				}
			})
		}
	}
}

const actions = {
	// user login
	login({ commit }, userInfo) {
		const { username, password, googleAuth } = userInfo
		return new Promise((resolve, reject) => {
			localStorage.setItem('username', username)
			localStorage.setItem('password', password)
			localStorage.setItem('googleAuth', googleAuth)
			login({
				username: username.trim(),
				password: md5(username.trim() + password.trim()),
				googleAuth,
				agentCode: 'AAAAA',
				version: '2.0',
				pwdNeedReset: !!userInfo.pwdNeedReset,
				prePassword: userInfo.prePassword ? userInfo.prePassword : ''
			})
				.then((response) => {
					if (response && response.code === 200) {
						const { data } = response
						commit('SET_TOKEN', data.token)
						commit('SET_ACCOUNT', data.userInfo.username)
						commit('SET_NAME', data.userInfo.nickName)
						commit('SET_ID', data.userInfo.id)
						setToken(data.token)
						setId(data.userInfo.id)
						setUsername(data.userInfo.username)
						setNickName(data.userInfo.nickName)
						resolve(data)
					} else {
						reject(response.data)
					}
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	getDics({ commit, state }) {
		return new Promise((resolve, reject) => {
			getDics().then((_) => {
				if (_.code === 200) {
					commit('SET_GLABALDICS', _.data)
				}
			})
			resolve()
		})
	},
	// user logout
	logout({ commit, state }) {
		return new Promise((resolve, reject) => {
			logout(state.token)
				.then(() => {
					commit('SET_TOKEN', '')
					removeToken()
					clearCookie()
					resetRouter()
					window.localStorage.clear()
					window.sessionStorage.clear()
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
		return getUserPermissions()
			.then((response) => {
				const data = response.status === 203 ? [] : response.data
				const result = []
				window.localStorage.setItem('role', JSON.stringify(data))
				loop(data, result)
				commit('SET_ROLES', data)
				commit('SET_ROLES_IDS', result)
				return response.data
			})
			.catch((err) => {
				console.log(err)
			})
	},
	changeDataLanguage({ commit }) {
		return new Promise((resolve) => {
			commit('SET_DATA', null)
			resolve()
		})
	}
}

function loop(data, result) {
	if (!data || data.length === 0) return []

	data.forEach((i) => {
		result.push(i.id)
		if (i.children && i.children.length > 0) {
			loop(i.children, result)
		}
	})
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
