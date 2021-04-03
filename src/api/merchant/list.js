import request from '@/utils/request'

const merchantApi = {
  Tree: '/wallet/mer/manage/list/tree',
  RootTree: '/wallet/mer/manage/noPlant/tree',
  MerchantList: '/wallet/mer/manage/query',
  SearchOne: '/wallet/mer/manage/editQuery',
  Insert:'/wallet/mer/manage/add',
  Update:'/wallet/mer/manage/standard/update',
  Delete:'/wallet/mer/manage/del',
  UpdateStatus:'/wallet/mer/manage/status/update',
  ExportAll:'/wallet/mer/manage/exportMerchantInfo/export',
  GenerateKey:'wallet/mer/manage/generate/key',//生成秘钥接口
  GenerateCode:'wallet/mer/manage/generate/merchantCode',//生成简称接口
}

export function deleet(parameter) {
  return request({
    url: merchantApi.Delete,
    method: 'post',
    data: parameter
  })
}

export function generateCode(parameter) {
  return request({
    url: merchantApi.GenerateCode,
    method: 'post',
    data: parameter
  })
}

export function generateKey(parameter) {
  return request({
    url: merchantApi.GenerateKey,
    method: 'post',
    data: parameter
  })
}
export function insert(parameter) {
  return request({
    url: merchantApi.Insert,
    method: 'post',
    data: parameter
  })
}

export function update(parameter) {
  return request({
    url: merchantApi.Update,
    method: 'post',
    data: parameter
  })
}

export function updateStatus(parameter) {
  return request({
    url: merchantApi.UpdateStatus,
    method: 'post',
    data: parameter
  })
}

export function searchOne(parameter) {
  return request({
    url: merchantApi.SearchOne,
    method: 'get',
    params: parameter
  })
}

export function getMerchantTree(parameter) {
  return request({
    url: merchantApi.Tree,
    method: 'get',
    params: parameter
  })
}

export function getMerchantRootTree(parameter) {
  return request({
    url: merchantApi.RootTree,
    method: 'get',
    params: parameter
  })
}

export function getMerchantList(parameter) {
  return request({
    url: merchantApi.MerchantList,
    method: 'get',
    params: parameter
  })
}

export function toggleFavorite(parameter) {
  return request({
    url: merchantApi.Favorite,
    method: 'post',
    data: parameter
  })
}

export function exportAll(parameter) {
  return ({
    url: merchantApi.ExportAll,
    params: parameter
  })
}