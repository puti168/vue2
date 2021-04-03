import request from '@/utils/request'
import store from '@/store'

// 异常拦截处理器
const errorHandler = (err) => {
  if (err.response) {
    if (err.response.status === 401) {
      store.dispatch('Logout').then(() => {
        window.location = '/login.html'
      })
    }
    message.error(err.response.data)
    console.error(err.response)
  } else {
    console.error(err)
    message.error(err.message)
  }
  return Promise.reject(err)
}

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)
