import axios from 'axios'
import { VueAxios } from './axios'
import message from 'ant-design-vue/es/message'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 30000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (err) => {
  if (err.response) {
    message.error(err.message)
  }
  console.log(err)
  return Promise.reject(err)
}

// request interceptor
request.interceptors.request.use(config => {
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

const getUri = (config, prefix = true) => {
  const { url = '', params = {} } = config
  if (prefix) {
    return request.getUri({
      url: process.env.VUE_APP_API_BASE_URL + url,
      params: { _t: new Date().getTime(), ...params }
    })
  }
  return request.getUri({
    url,
    params
  })
}

const toPage = (config) => {
  window.location = getUri(config, false)
}


export {
  installer as VueAxios,
  request as axios,
  getUri,
  toPage
}
