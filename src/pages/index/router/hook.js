import router from './index'
import store from '../store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

let currentPath = '/'

router.beforeEach((to, from, next) => {
  currentPath = to.path
  console.log(to, from)
  if (currentPath == '/index.html') {
    const redirect = decodeURIComponent(to.query.redirect || '/')
    next({ path: redirect })
    return
  }
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`))
  /* has token */
  if (storage.get(ACCESS_TOKEN)) {
    if (store.getters.roles.length === 0) {
      // request login userInfo
      store
        .dispatch('GetInfo')
        .then(res => {
          const { data = {} } = res
          const { menuTree = {} } = data
          // generate dynamic router
          store.dispatch('GenerateRoutes', { menuTree }).then(() => {
            // 根据roles权限生成可访问的路由表
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              // set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
            }
          })
        })
        .catch((message) => {
          notification.error({
            message: '错误',
            description: message
          })
          // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
          store.dispatch('Logout').then(() => {
            window.location = `/login.html?redirect=${to.fullPath}`
          })
        })
    } else {
      next()
    }
  } else {
    window.location = `/login.html?redirect=${to.fullPath}`
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

router.onError((err) => {
  console.error(err, currentPath)
  window.location = currentPath
})