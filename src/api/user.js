import request from '@/utils/request'

const reportApi = {
  QueryUser: '/ums/user/query',
  NewAddUser: '/ums/user/add',
  AdminNameQuery: 'ums/user/adminName/query',
  EditUpdate: '/ums/user/standard/update',
  StatusUpdate: '/ums/user/status/update',
  DeleteUpdate: '/ums/user/delete',
  QueryRole: '/ums/role/list',
  GooglePath: '/ums/google/path',
  SecretAdd: '/ums/google/secret/add',
  CheckQuery: '/ums/google/check/query',
  UpdateGoogle: '/ums/user/google/update',
  RoleQuery: 'ums/role/query',
  RoleNameQuery: '/ums/role/roleName/query',
  AllMenu: 'ums/menu/query',
  BatchDelete: 'ums/role/batch/delete',
  RoleDelete: 'ums/role/delete',
  RoleAdd: '/ums/role/add',
  RoleUpdate: '/ums/role/update',
  GenerateGoogleSecret:'/ums/google/secret', //谷歌秘钥生成接口
  ResetPassword:'/ums/user/password/update'
}
export function resetPassword(parameter) {
  return request({
    url: reportApi.ResetPassword,
    method: 'post',
    data: parameter
  })
}
export function generateGoogleSecret(parameter) {
  return request({
    url: reportApi.GenerateGoogleSecret,
    method: 'post',
    data: parameter
  })
}
export function getQueryUser(parameter) {
  return request({
    url: reportApi.QueryUser,
    method: 'post',
    data: parameter
  })
}
export function setDeleteUpdate(parameter) {
  return request({
    url: reportApi.DeleteUpdate,
    method: 'post',
    params: parameter
  })
}
export function setAdminNameQuery(parameter) {
  return request({
    url: reportApi.AdminNameQuery,
    method: 'post',
    params: parameter
  })
}
export function getQueryRole(parameter) {
  return request({
    url: reportApi.QueryRole,
    method: 'get',
    params: parameter
  })
}
export function setStatusUpdate(parameter) {
  return request({
    url: reportApi.StatusUpdate,
    method: 'post',
    data: parameter
  })
}
export function setEditUpdate(parameter) {
  return request({
    url: reportApi.EditUpdate,
    method: 'post',
    data: parameter
  })
}
export function setNewAddUser(parameter) {
  return request({
    url: reportApi.NewAddUser,
    method: 'post',
    data: parameter
  })
}
export function setUpdateGoogle(parameter) {
  return request({
    url: reportApi.UpdateGoogle,
    method: 'post',
    data: parameter
  })
}
export function getGooglePath(parameter) {
  return request({
    url: reportApi.GooglePath,
    method: 'post',
    params: parameter
  })
}
export function getSecretAdd(parameter) {
  return request({
    url: reportApi.SecretAdd,
    method: 'post',
    data: parameter
  })
}
export function setCheckQuery(parameter) {
  return request({
    url: reportApi.CheckQuery,
    method: 'post',
    params: parameter
  })
}
export function getRoleQuery(parameter) {
  return request({
    url: reportApi.RoleQuery,
    method: 'post',
    params: parameter
  })
}
export function getRoleNameQuery(parameter) {
  return request({
    url: reportApi.RoleNameQuery,
    method: 'post',
    params: parameter
  })
}
export function getAllMenu(parameter) {
  return request({
    url: reportApi.AllMenu,
    method: 'get',
    params: parameter
  })
}
export function setBatchDelete(parameter) {
  return request({
    url: reportApi.BatchDelete,
    method: 'post',
    data: parameter
  })
}
export function setRoleDelete(parameter) {
  return request({
    url: reportApi.RoleDelete,
    method: 'post',
    params: parameter
  })
}
export function setRoleAdd(parameter) {
  return request({
    url: reportApi.RoleAdd,
    method: 'post',
    data: parameter
  })
}
export function setRoleUpdate(parameter) {
  return request({
    url: reportApi.RoleUpdate,
    method: 'post',
    params: parameter
  })
}