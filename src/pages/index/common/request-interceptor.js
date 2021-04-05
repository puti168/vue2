import request from '@/utils/request'
import storage from 'store'
import store from '../store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import router from '../router'

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    // 从 localstorage 获取 token
    if (error.response.status === 403) {
      router.push('/403')
    }
    if (error.response.status === 404) {
      router.push('/404')
    }
    if (error.response.status === 500) {
      router.push('/500')
    }
    if (error.response.status === 401) {
      store.dispatch('Logout').then(() => {
        window.location = `/login.html?redirect=${window.location.pathname}${window.location.search}`
      })
    }
  }
  console.log(error)
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Access-Token'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)
