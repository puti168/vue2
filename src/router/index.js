import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'
Vue.use(Router)

export const constantRoutes = [
	{
		path: '/dashboard',
		component: Layout,
		redirect: '/dashboard/index',
		children: [
			{
				path: 'index',
				component: () => import('@/views/index'),
				name: 'Dashboard',
				meta: { title: '首页', icon: 'bb_home', affix: true }
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/404'),
		hidden: true
	},
	{
		path: '*',
		component: () => import('@/views/404'),
		hidden: true
	}
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
