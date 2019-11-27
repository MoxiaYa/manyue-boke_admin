// 上传图片接口
import request from '@/utils/request'

export function uploadWangImg(img) {
  return request({
    url: 'http://193.112.79.84:80/file-server/upload/img',
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data;'
    },
    data: img
  })
}
