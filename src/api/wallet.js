import request from '@/utils/request'

const walletApi = {
  Balance: '/wallet-demo/ob/balance',
  Login: '/wallet-demo/ob/login',
  Withdraw: '/wallet-demo/ob/withdraw',
  Deposit: '/wallet-demo/ob/deposit',
}

export function loadWalletBalance(parameter){
  return request({
    url: walletApi.Balance,
    method: 'post',
    data: parameter
  })
}

export function joinGame(parameter){
  return request({
    url: walletApi.Login,
    method: 'post',
    data: parameter
  })
}

export function withdrawWallet(parameter){
  return request({
    url: walletApi.Withdraw,
    method: 'post',
    data: parameter
  })
}

export function depositWallet(parameter){
  return request({
    url: walletApi.Deposit,
    method: 'post',
    data: parameter
  })
}
