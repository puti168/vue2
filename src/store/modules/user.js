import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.data || {}
          if (result.token) {
            result.token = result.token
            storage.set(ACCESS_TOKEN, result.token, 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {debugger
      console.log("~~~~~~~~~~~~~")
      return new Promise((resolve, reject) => {
        getInfo().then(response => {debugger
          if (response.code != 200) {
            reject(response.msg)
            return
          }
          const { userInfo = {} } = response.data || {}
          if (!userInfo.username) {
            reject('非法用户信息，请联系管理员')
            return
          }
          commit('SET_ROLES', [userInfo.roleId])
          commit('SET_INFO', userInfo)
          commit('SET_NAME', { name: userInfo.username, welcome: welcome() })
          commit('SET_AVATAR', userInfo.avatar)

          resolve(response)
        }).catch(error => {
          console.error(error)
          reject('请求用户信息失败，请联系管理员')
        })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          resolve()
        }).catch(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          resolve()
        }).finally(() => {
        })
      })
    },
  }
}

export default user
