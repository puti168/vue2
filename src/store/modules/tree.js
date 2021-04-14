const state = {
	selectValue: 'chatStatus',
	tree: [],
	data: []
}

const mutations = {
	SET_TREE: (state, value) => {
		state.tree = value
	},
	SET_SELECTVALUE: (state, value) => {
		state.selectValue = value
	},
	SET_TREEDATA: (state, value) => {
		state.data = value
	}
}

const actions = {
	setTree({ commit }, value) {
		commit('SET_TREE', value)
	},
	setSelectValue({ commit }, value) {
		commit('SET_SELECTVALUE', value)
	},
	setTreeData({ commit }, value) {
		commit('SET_TREEDATA', value)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
