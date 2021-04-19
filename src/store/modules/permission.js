import { constantRoutes } from '@/router'
import serviceMap from './route'
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
	if (route.meta && route.meta.roles) {
		return roles.some((role) => route.meta.roles.includes(role))
	} else {
		return true
	}
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
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
	nowRoute: ''
}

const mutations = {
	SET_ROUTES: (state, value) => {
		state.addRoutes = value.parentRoutes
		state.routes = constantRoutes.concat(value.parentRoutes)
		state.userBtns = value.userBtns
	},
	CLEAR_ROUTES: (state) => {
		state.addRoutes = []
	},
	SET_NOWROUTE: (state, value) => {
		state.nowRoute = value.id
	}
}

const actions = {
	generateRoutes({ commit }, roles) {
		return new Promise((resolve) => {
			console.log('roles')
			console.log(roles)
			const userRoutes = loop(roles, [])
			console.log('userRoutes')
			console.log(userRoutes)
			let parentRoutes = []
			const userBtns = userRoutes.map((val) => val.id)
			userRoutes.forEach((element) => {
				const mapElement = serviceMap.find((item) => item.id === element.id)
				element = {
					...element,
					...mapElement
				}
				if (mapElement) {
					if (element.parentId === '1001') {
						parentRoutes.push({
							id: element.id,
							path: element.path,
							name: element.id,
							component: Layout,
							parentId: element.parentId,
							meta: {
								title: mapElement.title,
								icon: element.icon
							},
							children: [],
							isRedirect: element.isRedirect
						})
					} else if (element.parentId === '0') {
						parentRoutes.push({
							id: element.id,
							path: element.path,
							name: element.id,
							component: Layout,
							children: [],
							checked: false
						})
					} else if (+element.parentId > 0) {
						const index = parentRoutes.findIndex(
							(val) => val.id === element.parentId
						)
						if (index > -1) {
							parentRoutes[index].children.push({
								path: element.path,
								name: element.id,
								component: (resolve) => require(['@/views' + element.path + '/index'], resolve),
								// component: () => import('@/views' + element.path + '/index'),
								meta: {
									title: mapElement.title,
									icon: element.icon
								}
							})
						}
					}
				}
			})
			parentRoutes = parentRoutes.filter((val) => {
				return !val.children || (val.children && val.children.length)
			})

			parentRoutes.forEach((element) => {
				if (element.isRedirect) {
					element.redirect = `${element.path}${element.children[0].path}`
				}
			})
			parentRoutes.push({
				path: '*',
				redirect: '/404',
				hidden: true
			})
			// 根路由跳转, 定义根路由
			const rootRoutes = []
			if (parentRoutes.length) {
				const rootRoute = parentRoutes[0]
				if (rootRoute.children && rootRoute.children.length) {
					rootRoutes.push({
						path: '/',
						redirect: rootRoute.children && rootRoute.children[0].path
					})
				} else {
					rootRoutes.push({
						path: '/',
						redirect: rootRoute.path
					})
				}
			}
			parentRoutes = parentRoutes.concat(rootRoutes)
			console.log('parentRott')
			console.log(parentRoutes)
			commit('SET_ROUTES', {
				parentRoutes,
				userBtns
			})
			resolve(parentRoutes)
		})
	},
	clearRoutes({ commit }) {
		commit('CLEAR_ROUTES')
	},
	setNowroute({ commit }) {
		commit('SET_NOWROUTE')
	}
}

// 迭代拍平
function loop(roles, arr) {
	if (!roles || !roles.length) return []

	roles.forEach((i) => {
		arr.push(i)
		if (i && i.children && i.children.length) {
			loop(i.children, arr)
		}
	})

	return arr
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
