// eslint-disable-next-line
import { BasicLayout } from '../layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

// 前端路由表
export const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  RouteView: RouteView,
  '/403': () => import(/* webpackChunkName: "error" */ '../views/exception/403'),
  '/404': () => import(/* webpackChunkName: "error" */ '../views/exception/404'),
  '/500': () => import(/* webpackChunkName: "error" */ '../views/exception/500'),

  '/': BasicLayout,
  //权限管理
  '/manager/system': RouteView,
  '/manager/user': () => import('../views/manager/user'),
  '/manager/role': () => import('../views/manager/role'),
}

export const lastConstantRouters = [
  {
    path: '*', redirect: '/403', hidden: true
  }
]
/**
 * 基础路由
 * ..type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/403',
    component: () => import(/* webpackChunkName: "fail" */ '../views/exception/403')
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '../views/exception/404')
  },
  {
    path: '/500',
    component: () => import(/* webpackChunkName: "fail" */ '../views/exception/500')
  }

]

