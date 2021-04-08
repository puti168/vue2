import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{ path: '*', redirect: '/404', hidden: true },
	{
		path: '/home',
		title: '系统首页',
		component: Layout,
		hidden: false,
		meta: { title: '系统首页', icon: 'home' }
	},
	{
		path: '/',
		title: '注单多源同步',
		component: Layout,
		redirect: '/dealer',
		meta: { title: '注单多源同步', icon: 'form' },
		children: [
			{
				path: '/dealer',
				name: '未完成校对局',
				meta: { title: '未完成校对局', icon: 'form' },
				component: () => import('@/views/bet/dealer/index')
			},
			{
				path: '/dealerDetail',
				name: '已完成校对局',
				meta: { title: '已完成校对局', icon: 'form' },
				component: () => import('@/views/bet/dealerDetail/index')
			}
		],
		roleId: '2000'
	},
	{
		path: '/cards1',
		title: 'API请求监控',
		component: Layout,
		meta: { title: 'API请求监控', icon: 'form' },
		children: [
			{
				path: '/cards',
				name: '访问统计报表',
				meta: { title: '访问统计报表', icon: 'form' },
				component: () => import('@/views/access/cards/index')
			},
			{
				path: '/cardsDetail',
				name: '访问详情统计',
				meta: { title: '访问详情统计', icon: 'form' },
				component: () => import('@/views/access/cardsDetail/index')
			}
		]
	},
	{
		path: '/water1',
		title: '拉单服务监控',
		component: Layout,
		meta: { title: '拉单服务监控', icon: 'form' },
		children: [
			{
				path: '/rateOmisionMonitor',
				name: '拉单遗漏监控',
				meta: { title: '拉单遗漏监控', icon: 'form' },
				component: () => import('@/views/pull/rateOmisionMonitor/index')
			},
			{
				path: '/noPullRate',
				name: '商户未拉取注单',
				meta: { title: '商户未拉取注单', icon: 'form' },
				component: () => import('@/views/pull/noPullRate/index')
			},
			{
				path: '/waterDetail',
				name: '商户拉单日志',
				meta: { title: '商户拉单日志', icon: 'form' },
				component: () => import('@/views/pull/waterDetail/index')
			},
			{
				path: '/water',
				name: '拉单数据量监控',
				meta: { title: '拉单数据量监控', icon: 'form' },
				component: () => import('@/views/pull/water/index')
			}
		]
	},
	{
		path: '/serverMonitor',
		title: '服务器监控',
		component: Layout,
		meta: { title: '服务器监控', icon: 'form' },
		children: [
			{
				path: '/apiServerMonitor',
				name: 'API服务器监控',
				meta: { title: 'API服务器监控', icon: 'form' },
				component: () => import('@/views/serverMonitor/apiServerMonitor/index')
			},
			{
				path: '/rateServerMonitor',
				name: '拉单服务器监控',
				meta: { title: '拉单服务器监控', icon: 'form' },
				component: () => import('@/views/serverMonitor/rateServerMonitor/index')
			},
			{
				path: '/elasticsearch',
				name: 'elasticsearch集群监控',
				meta: { title: 'elasticsearch集群监控', icon: 'form' },
				component: () => import('@/views/serverMonitor/elasticsearch/index')
			}
		]
	},
	{
		path: '/merchantUser',
		title: '区域分析',
		component: Layout,
		// component: () => import('@/views/merchantUser/index'),
		meta: { title: '区域分析', icon: 'form' },
		children: [
			{
				path: '/merchantUserLogin',
				name: '登录用户区域分析',
				meta: { title: '登录用户区域分析', icon: 'form' },
				component: () => import('@/views/merchantUser/merchantUserLogin/index')
			},
			{
				path: '/merchantUserBet',
				name: '投注用户区域分析',
				meta: { title: '投注用户区域分析', icon: 'form' },
				component: () => import('@/views/merchantUser/merchantUserBet/index')
			}
		]
	},
	// {
	// 	path: '/merchantUser1',
	// 	title: '商户用户区域分析',
	// 	component: Layout,
	// 	// component: () => import('@/views/merchantUser/index'),
	// 	meta: { title: '商户用户区域分析', icon: 'form' },
	// 	children: [
	// 		{
	// 			path: '/merchantUser',
	// 			name: '商户用户区域分析',
	// 			meta: { title: '商户用户区域分析', icon: 'form' },
	// 			component: () => import('@/views/merchantUser/index')
	// 		}
	// 	]
	// },
	{
		path: '/getThreadPoolInfo1',
		title: '派彩监控',
		component: Layout,
		meta: { title: '派彩监控' },
		children: [
			{
				path: '/getThreadPoolInfo',
				name: '派彩服务线程池',
				meta: { title: '派彩服务线程池'},
				component: () => import('@/views/payout/getThreadPoolInfo/index')
			},
			{
				path: '/getSettleTableStatus',
				name: '局状态查询',
				meta: { title: '局状态查询'},
				component: () => import('@/views/payout/getSettleTableStatus/index')
			},
			{
				path: '/pushKafka',
				name: '注单补发kafka',
				meta: { title: '注单补发kafka'},
				component: () => import('@/views/payout/pushKafka/index')
			},
			{
				path: '/pushKafkaGroup',
				name: '注单补发group',
				meta: { title: '注单补发group'},
				component: () => import('@/views/payout/pushKafkaGroup/index')
			},
			{
				path: '/pushKafkaChange',
				name: '下注账变补发kafka',
				meta: { title: '下注账变补发kafka'},
				component: () => import('@/views/payout/pushKafkaChange/index')
			},
			{
				path: '/settleBetIds',
				name: '结算单个注单（结算和跳局）',
				meta: { title: '结算单个注单（结算和跳局）'},
				component: () => import('@/views/payout/settleBetIds/index')
			},
			{
				path: '/goAgainSettle',
				name: '重新结算（结算未收到mq的）',
				meta: { title: '重新结算（结算未收到mq的）'},
				component: () => import('@/views/payout/goAgainSettle/index')
			},
			{
				path: '/goSettleTablesStatusId',
				name: '继续结算（状态机表为0的）',
				meta: { title: '继续结算（状态机表为0的）'},
				component: () => import('@/views/payout/goSettleTablesStatusId/index')
			},
			{
				path: '/goSettleTablesStatusReset',
				name: '重置任务(状态机为2的)',
				meta: { title: '重置任务(状态机为2的)'},
				component: () => import('@/views/payout/goSettleTablesStatusReset/index')
			},
			{
				path: '/goSettleTablesStatusId21',
				name: '21点继续结算(状态机为0的)',
				meta: { title: '21点继续结算(状态机为0的)'},
				component: () => import('@/views/payout/goSettleTablesStatusId21/index')
			},
			{
				path: '/goSettleTablesStatusReset21',
				name: '21点重置任务(状态机为2的)',
				meta: { title: '21点重置任务(状态机为2的)'},
				component: () => import('@/views/payout/goSettleTablesStatusReset21/index')
			},
			{
				path: '/walletPushQuery',
				name: '单一钱包推送查询',
				meta: { title: '单一钱包推送查询'},
				component: () => import('@/views/payout/walletPushQuery/index')
			},
			{
				path: '/MQ',
				title: 'MQ通知管理',
				component: () => import('@/views/payout/MQ/index'),
				meta: { title: 'MQ通知管理', icon: 'form' }
			}
		]
	}
	// {
	// 	path: '/system',
	// 	title: 'system',
	// 	component: Layout,
	// 	meta: { title: 'system', icon: 'form' },
	// 	children: [
	// 		{
	// 			path: '/system',
	// 			name: 'System',
	// 			component: () => import('@/views/system/index')
	// 		}
	// 	],
	// 	roleId: '2300'
	// }
]
const createRouter = () =>
	new Router({
		// mode: 'history', // require service support
		scrollBehavior: () => ({ y: 0 }),
		routes: constantRoutes
	})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
