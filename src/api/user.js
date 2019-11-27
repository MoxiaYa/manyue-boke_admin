// 与用户有关的接口
import request from '@/utils/request'

// 登录
export function login(data) {
  var a = request({
    url: '/user/login',
    method: 'post',
    data
  })
  return a
}

// 获取信息
export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// 退出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 修改资料
export function editInfo(info) {
  console.log(info)
  return request({
    url: '/user/edit',
    method: 'post',
    data: info
  })
}
