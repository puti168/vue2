import { constantRouterComponents, constantRouterMap, lastConstantRouters } from 'index/router/table'

/**
 * 处理后台返回菜单数据
 * @param {*} rootMenu 
 * @param {*} followMercts 
 */
function filterAsyncRouter(rootMenu) {
  const accessedRouters = generateMenu(rootMenu)
  const routers = [
    accessedRouters,
    ...lastConstantRouters
  ]
  return routers
}

/**
 * 生成菜单
 * @param {*} menu 
 * @param {*} parent 
 */
function generateMenu(menu, parent) {
  const { code, path, name, type, icon, children = [] } = menu
  //如果是操作权限
  if (parent && code && type == 2) {
    parent.meta.actions.push(code)
    return
  }
  //菜单权限处理逻辑
  if (!path) {
    return
  }
  const current = {
    path: path,
    name: path,
    component: constantRouterComponents[path],
    meta: { title: name, icon, actions: [], keepAlive: false },
  }
  if (parent && type == 1) {
    parent.meta.keepAlive = true
    if (!parent.children) {
      parent.children = []
    }
    parent.children.push(current)
    if (!parent.redirect) {
      parent.redirect = menu.path
    }
  }
  children && children.forEach(v => {
    generateMenu(v, current)
  })
  return current
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { menuTree } = data
        const asyncRouterMap = filterAsyncRouter(menuTree)
        commit('SET_ROUTERS', asyncRouterMap)
        resolve()
      })
    }
  }
}

export default permission
