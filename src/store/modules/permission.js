import { constantRoutes } from '@/router'
import serviceMap from './route'
import Layout from '@/layout'

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
		state.nowRoute = value
	}
}

const actions = {
	generateRoutes({ commit }, roles) {
		return new Promise((resolve) => {
			const userRoutes = loop(roles, [])
			let parentRoutes = []
			const userBtns = userRoutes.map((val) => val.id)
			userRoutes.forEach((element) => {
				const mapElement = serviceMap.find((item) => item.id === element.id)
				element = {
					...element,
					...mapElement
				}
				// 二级菜单集合
				const midList = ['1300']
				if (mapElement) {
					// 一级菜单
					if (element.parentId === '0') {
						parentRoutes.push({
							id: element.id,
							path: element.path,
							name: element.permissionName,
							show: true,
							component: Layout,
							children: [],
							checked: false
						})
					} else if (midList.includes(element.id)) {
						// 二级菜单
						const index = parentRoutes.findIndex(
							(val) => val.id === element.parentId
						)
						if (index > -1) {
							parentRoutes[index].children.push({
								id: element.id,
								path: element.path,
								name: element.permissionName,
								component: Layout,
								parentId: element.parentId,
								checked: false,
								meta: {
									title: mapElement.title,
									icon: mapElement.icon
								},
								children: [],
								isRedirect: element.isRedirect
							})
						}
					} else if (midList.includes(element.parentId)) {
						// 三级菜单
						const midIndex = userRoutes.findIndex(
							(val) => val.id === element.parentId
						)
						const index = parentRoutes.findIndex(
							(val) => val.id === userRoutes[midIndex].parentId
						)
						const index2 = parentRoutes[index].children.findIndex(
							(val) => val.id === element.parentId
						)
						if (index > -1) {
							parentRoutes[index].children[index2].children.push({
								path: element.path,
								name: element.id,
								component: (resolve) =>
									require(['@/views' + element.path + '/index'], resolve),
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
	setNowroute({ commit }, id) {
		commit('SET_NOWROUTE', id)
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
