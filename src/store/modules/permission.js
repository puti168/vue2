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
	nowRoute: '2'
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
			userRoutes.forEach((element, val) => {
				const mapElement = serviceMap.find((item) => item.id === element.id)
				element = {
					...element,
					...mapElement
				}
				// 二级菜单集合
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
						setTimeout(() => {
							parentRoutes.forEach(data => {
								if (data.id === store.state.tagsView.visitedViews[1].matched[0].path.substr(1)) {
									data.checked = true
								}
							})
							store.dispatch('permission/setNowroute', store.state.tagsView.visitedViews[1].matched[0].path.substr(1))
						}, 200)
					} else if (element.level === 2) {
						// 二级菜单
						const index = parentRoutes.findIndex(
							(val) => val.id === element.parentId
						)
						if (index > -1) {
							parentRoutes[index].children.push({
								id: element.id,
								path: element.path,
								name: element.permissionName,
								component: Layout2,
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
					} else if (element.level === 3) {
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
								name: element.name ? element.name : element.permissionName,
								children: [],
								component: (resolve) =>
									require(['@/views' + element.path + '/index'], resolve),
								meta: {
									title: mapElement.title,
									icon: element.icon
								}
							})
						}
					} else {
						// 四级菜单
						const midIndex = userRoutes.findIndex(
							(val) => val.id === element.parentId
						)
						const index = parentRoutes.findIndex(
							(val) => val.id === userRoutes[midIndex].parentId
						)
						const index2 = parentRoutes[index].children.findIndex(
							(val) => val.id === element.parentId
						)
						const index3 = parentRoutes[index].children[index2].findIndex(
							(val) => val.id === element.parentId
						)
						if (index > -1) {
							parentRoutes[index].children[index2].children[index3].push({
								path: element.path,
								name: element.permissionName,
								id: element.id
							})
						}
					}
				}
			})
			parentRoutes = parentRoutes.filter((val) => {
				return !val.children || (val.children && val.children.length)
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
						redirect: rootRoute.children && rootRoute.children[0].children[0].path
					})
				} else {
					rootRoutes.push({
						path: '/',
						redirect: rootRoute.path
					})
				}
			}
			// 前端写死路由
			parentRoutes.forEach(item => {
				if (item.name === '会员') {
					item.children.forEach(data => {
						if (data.name === '会员审核') {
							data.children.push({
								path: '/member/memberReview/memberChangeReview',
								name: 'memberChangeReview',
								component: () => import(`@/views/member/memberReview/memberChangeReview/index`),
								meta: { title: '会员账户修改审核详情', icon: 'bb_reportDaily' },
								hidden: true
							})
							data.children.push({
								path: '/member/memberReview/addMemberReview',
								name: 'addMemberReview',
								component: () => import(`@/views/member/memberReview/addMemberReview/index`),
								meta: { title: '新增会员审核详情', icon: 'bb_reportDaily' },
								hidden: true
							})
						}
					})
				}
			})
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
