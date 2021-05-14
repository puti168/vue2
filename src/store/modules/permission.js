import { constantRoutes } from '@/router'
import serviceMap from '@/serviceMap/route'
import Layout from '@/layout'
// import Layout2 from '@/layout2'
// import store from '@/store'
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

// console.log('serviceMap', serviceMap)

const state = {
	routes: [],
	addRoutes: [],
	userBtns: [],
	nowRoute: '2',
	currentRoutes: {}
}

const mutations = {
	SET_ROUTES: (state, value) => {
		state.addRoutes = value.arr
		state.routes = constantRoutes.concat(value.arr)
		state.userBtns = value.userBtns
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

const actions = {
	generateRoutes({ commit }, roles) {
		return new Promise((resolve) => {
			let arr = JSON.stringify(roles)
			arr = filterAsyncRouter(JSON.parse(arr))
			// const userRoutes = loop(roles, [])
			// let parentRoutes = []
			// const userBtns = userRoutes.map((val) => val.id)
			// userRoutes.forEach((element, val) => {
			// 	const mapElement = serviceMap.find((item) => item.id === element.id)
			// 	element = {
			// 		...element,
			// 		...mapElement
			// 	}
			//
			// 	// console.log('菜单element', element)
			// 	// 二级菜单集合
			// 	if (mapElement) {
			// 		// 一级菜单
			// 		if (element.parentId === '0') {
			// 			parentRoutes.push({
			// 				id: element.id,
			// 				path: element.path,
			// 				name: element.permissionName,
			// 				show: true,
			// 				component: Layout,
			// 				children: [],
			// 				checked: false
			// 			})
			// 			setTimeout(() => {
			// 				parentRoutes.forEach((data) => {
			// 					if (
			// 						data.id ===
			// 						store.state.tagsView.visitedViews[1].matched[0].path.substr(1)
			// 					) {
			// 						data.checked = true
			// 					}
			// 				})
			// 				store.dispatch(
			// 					'permission/setNowroute',
			// 					store.state.tagsView.visitedViews[1].matched[0].path.substr(1)
			// 				)
			// 			}, 200)
			// 		} else if (element.level === 2) {
			// 			// 二级菜单
			// 			const index = parentRoutes.findIndex(
			// 				(val) => val.id === element.parentId
			// 			)
			// 			if (index > -1) {
			// 				parentRoutes[index].children.push({
			// 					id: element.id,
			// 					path: element.path,
			// 					name: element.permissionName,
			// 					component: Layout2,
			// 					parentId: element.parentId,
			// 					checked: false,
			// 					meta: {
			// 						title: mapElement.title,
			// 						icon: mapElement.icon
			// 					},
			// 					children: [],
			// 					isRedirect: element.isRedirect
			// 				})
			// 			}
			// 		} else if (element.level === 3) {
			// 			// 三级菜单
			// 			const midIndex = userRoutes.findIndex(
			// 				(val) => val.id === element.parentId
			// 			)
			// 			const index = parentRoutes.findIndex(
			// 				(val) => val.id === userRoutes[midIndex].parentId
			// 			)
			// 			const index2 = parentRoutes[index].children.findIndex(
			// 				(val) => val.id === element.parentId
			// 			)
			// 			const fullPath = element.path
			// 			const pos = fullPath.lastIndexOf('/')
			// 			const filePath = fullPath.substr(pos + 1)
			// 			if (index > -1) {
			// 				parentRoutes[index].children[index2].children.push({
			// 					path: element.path,
			// 					name: element.name ? element.name : filePath,
			// 					children: [],
			// 					component: (resolve) =>
			// 						require(['@/views' + element.path + '/index'], resolve),
			// 					meta: {
			// 						title: mapElement.title,
			// 						icon: element.icon
			// 					}
			// 				})
			// 			}
			// 		} else {
			// 			// 四级菜单
			// 			const midIndex = userRoutes.findIndex(
			// 				(val) => val.id === element.parentId
			// 			)
			// 			const index = parentRoutes.findIndex(
			// 				(val) => val.id === userRoutes[midIndex].parentId
			// 			)
			// 			const index2 = parentRoutes[index].children.findIndex(
			// 				(val) => val.id === element.parentId
			// 			)
			// 			const index3 = parentRoutes[index].children[index2].findIndex(
			// 				(val) => val.id === element.parentId
			// 			)
			// 			if (index > -1) {
			// 				parentRoutes[index].children[index2].children[index3].push({
			// 					path: element.path,
			// 					name: element.permissionName,
			// 					id: element.id
			// 				})
			// 			}
			// 		}
			// 	}
			// })
			// parentRoutes = parentRoutes.filter((val) => {
			// 	return !val.children || (val.children && val.children.length)
			// })
			// // 根路由跳转, 定义根路由
			const rootRoutes = []
			if (arr.length) {
				const rootRoute = arr[0]
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
			// 前端写死路由
			// parentRoutes.forEach((item) => {
			// 	if (item.name === '会员') {
			// 		item.children.forEach((data) => {
			// 			if (data.name === '会员审核') {
			// 				data.children.push(
			// 					{
			// 						path: '/member/memberReview/memberChangeReview',
			// 						name: 'memberChangeReview',
			// 						component: () =>
			// 							import(`@/views/member/memberReview/memberChangeReview/index`),
			// 						meta: { title: '会员账户修改审核详情' },
			// 						hidden: true
			// 					},
			// 					{
			// 						path: '/member/memberReview/addMemberReview',
			// 						name: 'addMemberReview',
			// 						component: () =>
			// 							import(`@/views/member/memberReview/addMemberReview/index`),
			// 						meta: { title: '新增会员审核详情' },
			// 						hidden: true
			// 					}
			// 				)
			// 			}
			// 		})
			// 	}
			// 	if (item.name === '代理') {
			// 		item.children.forEach((data) => {
			// 			if (data.name === '代理审核') {
			// 				data.children.push(
			// 					{
			// 						path: '/agent/agencyReview/agencyEditReview',
			// 						name: 'agencyEditReview',
			// 						component: () =>
			// 							import(`@/views/agent/agencyReview/agencyEditReview/index`),
			// 						meta: { title: '代理账户修改审核详情' },
			// 						hidden: true
			// 					},
			// 					{
			// 						path: '/agent/agencyReview/addReviewDetail',
			// 						name: 'addReviewDetail',
			// 						component: () =>
			// 							import(`@/views/agent/agencyReview/addReviewDetail/index`),
			// 						meta: { title: '新增代理审核详情' },
			// 						hidden: true
			// 					}
			// 				)
			// 			}
			// 			if (data.name === '推广管理') {
			// 				data.children.push({
			// 					path: '/agent/promotionManagement/domainCreateAndEidt',
			// 					name: 'domainCreateAndEidt',
			// 					component: () =>
			// 						import(`@/views/agent/promotionManagement/domainCreateAndEidt/index`),
			// 					meta: { title: '推广域名创建/编辑' },
			// 					hidden: true
			// 				})
			// 			}
			// 		})
			// 	}
			// 	if (item.name === '游戏') {
			// 		item.children.forEach((data) => {
			// 			if (data.name === '游戏配置') {
			// 				data.children.push({
			// 					path: '/game/gameConfig/gameManagementEdit',
			// 					name: 'gameManagementEdit',
			// 					component: () =>
			// 						import(`@/views/game/gameConfig/gameManagementEdit/index`),
			// 					meta: { title: '游戏管理创建编辑' },
			// 					hidden: true
			// 				})
			// 			}
			// 			if (data.name === '游戏推荐') {
			// 				data.children.push({
			// 					path: '/game/gameConfig/gameHomeRecommendEdit',
			// 					name: 'gameHomeRecommendEdit',
			// 					component: () =>
			// 						import(`@/views/game/gameRecommend/gameHomeRecommendEdit/index`),
			// 					meta: { title: '推荐位管理编辑' },
			// 					hidden: true
			// 				})
			// 			}
			// 			if (data.name === '游戏注单') {
			// 				data.children.push({
			// 					path: '/game/gameBetslip/gameBetslipDetails',
			// 					name: 'gameBetslipDetails',
			// 					component: () =>
			// 						import(`@/views/game/gameBetslip/gameBetslipDetails/index`),
			// 					meta: { title: '游戏注单详情' },
			// 					hidden: true
			// 				})
			// 			}
			// 		})
			// 	}
			// })
			arr = arr.concat(rootRoutes)
			console.log('arr', arr)
			commit('SET_ROUTES', {
				arr
			})
			resolve(arr)
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

// 遍历后台路由
function filterAsyncRouter(asyncRouterMap) {
	return asyncRouterMap.filter((route) => {
		if (!route.component) {
			if (route.level !== 3) {
				route.component = Layout
			} else {
				route.component = (resolve) =>
					require(['@/views' + route.path + '/index'], resolve)
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
					}
				})
			}
		})
		if (route.children != null && route.children && route.children.length) {
			route.children = filterAsyncRouter(route.children)
		}
		return true
	})
}

export const loadView = (view) => {
	return () => import(`@/views/${view}`)
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
