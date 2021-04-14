import Cookies from 'js-cookie'
import { getLanguage } from '@/utils/lang/index'

const state = {
	sidebar: {
		opened: Cookies.get('sidebarStatus')
			? !!+Cookies.get('sidebarStatus')
			: true,
		withoutAnimation: false
	},
	device: 'desktop',
	language: getLanguage(),
	// 修改密码弹窗
	modifyVisible: false
}

const mutations = {
	TOGGLE_SIDEBAR: (state) => {
		state.sidebar.opened = !state.sidebar.opened
		state.sidebar.withoutAnimation = false
		if (state.sidebar.opened) {
			Cookies.set('sidebarStatus', 1)
		} else {
			Cookies.set('sidebarStatus', 0)
		}
	},
	CLOSE_SIDEBAR: (state, withoutAnimation) => {
		Cookies.set('sidebarStatus', 0)
		state.sidebar.opened = false
		state.sidebar.withoutAnimation = withoutAnimation
	},
	TOGGLE_DEVICE: (state, device) => {
		state.device = device
	},
	GET_LOOKUPDATA: (state, data) => {
		state.lookUpData = data
	},
	SET_LANGUAGE: (state, language) => {
		state.language = language
		Cookies.set('language', language)
	},
	SET_MODIFY: (state, value) => {
		state.modifyVisible = value
	}
}

const actions = {
	toggleSideBar({ commit }) {
		commit('TOGGLE_SIDEBAR')
	},
	closeSideBar({ commit }, { withoutAnimation }) {
		commit('CLOSE_SIDEBAR', withoutAnimation)
	},
	toggleDevice({ commit }, device) {
		commit('TOGGLE_DEVICE', device)
	},
	setLanguage({ commit }, language) {
		commit('SET_LANGUAGE', language)
	},
	setModify({ commit }, value) {
		commit('SET_MODIFY', value)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
