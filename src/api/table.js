// 获取表单数据
import request from '@/utils/request'

export function getList() {
  return request({
    url: '/boke/sel',
    method: 'get'
  })
}

export function searchList(params) {
  return request({
    url: '/boke/selByTitle',
    method: 'get',
    params
  })
}

export function addBoke(data) {
  return request({
    url: '/boke/add',
    method: 'post',
    data
  })
}

export function delList(id) {
  return request({
    url: '/boke/del',
    method: 'get',
    params: { id }
  })
}

export function editList(data) {
  return request({
    url: '/boke/update',
    method: 'post',
    data
  })
}

export function editEnabled(data) {
  return request({
    url: '/boke/editEnabled',
    method: 'get',
    params: data
  })
}

export function delMoreList(data) {
  return request({
    url: '/boke/delMore',
    method: 'POST',
    data
  })
}

/**
 *
 * @param {获取评论列表} params
 */
export function getDiscusses(params) {
  return request({
    url: '/boke/selDisByBoke',
    method: 'GET',
    params
  })
}

/**
 *
 * @param {删除评论} params
 */
export function delDiscuss(params) {
  return request({
    url: '/boke/delDis',
    method: 'GET',
    params
  })
}

/**
 * 作者发表评论
 * @param {} data
 */
export function sendDiscuss(data) {
  return request({
    url: '/boke/addDis',
    method: 'POST',
    data
  })
}
