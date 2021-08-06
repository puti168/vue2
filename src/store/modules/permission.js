import { constantRoutes } from '@/router'
import serviceMap from '@/serviceMap/route'
import Layout from '@/layout'
import Layout2 from '@/layout2'
import store from '@/store'
function hasPermission(roles, route) {
	if (route.meta && route.meta.roles) {
		return roles.some((role) => route.meta.roles.includes(role))
	} else {
		return true
	}
}

export function filterAsyncRoutes(routes, roles) {
	const res = []

	routes.forEach((route) => {
		const tmp = { ...route }
		if (hasPermission(roles, tmp)) {
			if (tmp.children) {
				tmp.children = filterAsyncRoutes(tmp.children, roles)
			}
			res.push(tmp)
		}
	})

	return res
}

const state = {
	routes: [],
	addRoutes: [],
	userBtns: [],
	nowRoute: '2',
	currentRoutes: {}
}

const userBtns = []
const mutations = {
	SET_ROUTES: (state, value) => {
		state.addRoutes = value.asyncRouterMap
		state.routes = constantRoutes.concat(value.asyncRouterMap)
		state.userBtns = value._newUserBtns
	},
	CLEAR_ROUTES: (state) => {
		state.addRoutes = []
	},
	SET_NOWROUTE: (state, value) => {
		state.nowRoute = value
	},
	SET_CURRENT_ROUTES: (state, routes) => {
		state.currentRoutes = routes
	}
}

const sortRoutes = (routes) => {
	return routes.filter((route) => {
		routes.sort((a, b) => a.orderNum * 1 - b.orderNum * 1)
		if (route.children !== null && route.children && route.children.length) {
			route.children = sortRoutes(route.children)
		}
		return true
	})
}
const res = []
const filterBtns = (routes) => {
	routes.forEach((route) => {
		route.id && res.push(route.id)
		route.length && filterBtns(route)
	})
	return res
}

const actions = {
	generateRoutes({ commit }, roles) {
		return new Promise((resolve) => {
			let asyncRouterMap = JSON.stringify(roles)
			asyncRouterMap = filterAsyncRouter(JSON.parse(asyncRouterMap))
			sortRoutes(asyncRouterMap)
			const rootRoutes = []
			if (asyncRouterMap.length) {
				const rootRoute = asyncRouterMap[0]
				if (rootRoute.children && rootRoute.children.length) {
					rootRoutes.push({
						path: '/',
						redirect:
							rootRoute.children && rootRoute.children[0].children[0].path
					})
				} else {
					rootRoutes.push({
						path: '/',
						redirect: rootRoute.path
					})
				}
			}
			asyncRouterMap = asyncRouterMap.concat(rootRoutes)
			const id = window.sessionStorage.getItem('activeId')
			id && store.dispatch('permission/setNowroute', id)
			const _newUserBtns = filterBtns(userBtns)
			commit('SET_ROUTES', {
				asyncRouterMap,
				_newUserBtns
			})
			resolve(asyncRouterMap)
		})
	},
	clearRoutes({ commit }) {
		commit('CLEAR_ROUTES')
	},
	setNowroute({ commit }, id) {
		commit('SET_NOWROUTE', id)
	}
}
//
// // 迭代拍平
// function loop(roles, arr) {
// 	if (!roles || !roles.length) return []
//
// 	roles.forEach((i) => {
// 		arr.push(i)
// 		if (i && i.children && i.children.length) {
// 			loop(i.children, arr)
// 		}
// 	})
// 	return arr
// }

// 路由鉴权
function filterAsyncRouter(asyncRouterMap) {
	return asyncRouterMap.filter((route) => {
		if (route.type === '0') {
			if (!route.component) {
				if (route.level !== 3) {
					route.level === 1
						? (route.component = Layout)
						: (route.component = Layout2)
				} else {
					route.component = (resolve) =>
						require(['@/views' + route.path + '/index'], resolve)
					route.bottom && route.bottom.length && userBtns.push(route.bottom)
				}
			}
			serviceMap.forEach((item) => {
				if (item.id === route.id) {
					Object.assign(route, {
						path: item.path ? item.path : route.path,
						name: route.permissionName,
						meta: {
							title: item.title,
							icon: item.icon
						},
						show: true,
						checked: false
					})
					if (route.level === 3) {
						const fullPath = route.path
						const pos = fullPath.lastIndexOf('/')
						const filePath = fullPath.substr(pos + 1)
						route.name = filePath
						// 按钮id
					}
				}
			})

			if (route.children !== null && route.children && route.children.length) {
				route.children = filterAsyncRouter(route.children)
			}
		}
		return true
	})
}

// export const loadView = (view) => {
// 	return () => import(`@/views/${view}`)
// }

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
