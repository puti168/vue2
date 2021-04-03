import request from '@/utils/request'

const userApi = {
  Login: '/wallet-demo/user/login',
  Register: '/wallet-demo/user/register',
  Balance: '/wallet-demo/user/balance',
}

export function changeBalance(parameter) {
  return request({
    url: userApi.Balance,
    method: 'post',
    data: parameter
  })
}

export function login(parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function register(parameter) {
  return request({
    url: userApi.Register,
    method: 'post',
    data: parameter
  })
}
