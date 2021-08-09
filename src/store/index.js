import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
// import createPersistedState from 'vuex-persistedstate'
// import createLogger from 'vuex/dist/logger'
// const debug = process.env.NODE_ENV !== 'production'

// const createPersisted = createPersistedState({
// 	storage: window.sessionStorage,
// 	reducer(val) {
// 		return {
// 			permission: val.permission
// 		}
// 	}
// })

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		app,
		settings,
		user,
		permission,
		tagsView
	},
	getters
})

export default store
