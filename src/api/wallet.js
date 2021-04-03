import request from '@/utils/request'

const balanceApi = {
  WalletBalance: '/wallet-server/balance',
}

export function loadWalletBalance(parameter){
  return request({
    url: balanceApi.WalletBalance,
    method: 'post',
    data: parameter
  })
}
