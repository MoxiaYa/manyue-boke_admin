import { addRouter } from './router'

import Cookies from 'js-cookie'

var fw = {

  demo1() {
    console.log('112221')
  },
  getCookie(key) {
    return Cookies.get(key)
  },
  setCookie(key, value) {
    return Cookies.set(key, value)
  },
  removeCookie(key) {
    return Cookies.removeCookie(key)
  },
  /**
   * 基于element-ui $alert 详细文档：https://element.eleme.cn/#/zh-CN/component/message-box
   * @param {*} _this 实例对象
   * @param {*} param1 title:弹框标题 text:弹框内容 okText:确定按钮内容 htmlMessage:弹框内容是否作为HTML片段处理
   * type:消息类型（用来显示图标，默认没有图标) (success / info / warning / error)
   * callback:若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调↓
   * function(action, instance)，action 的值为'confirm', 'cancel'或'close', instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法
   * center:是否居中布局,默认为否
   * distinguishCancelAndClose:是否将取消（点击取消按钮）与关闭（点击关闭按钮或遮罩层）进行区分
   * closeOnClickModal:是否可通过点击遮罩关闭 MessageBox
   */
  elAlert(_this, { title = '警告', text = '这是一个警告框', okText = '确定', htmlMessage = false, type, callback, center = false, distinguishCancelAndClose = false, closeOnClickModal = true }) {
    return new Promise((resolve, reject) => {
      _this.$alert(text, title, {
        confirmButtonText: okText,
        dangerouslyUseHTMLString: htmlMessage,
        type: type,
        callback: callback,
        center: center,
        distinguishCancelAndClose: distinguishCancelAndClose,
        closeOnClickModal: closeOnClickModal
      }).then(() => {
        resolve()
      }).catch(() => {
        reject()
      })
    })
  },
  /**
   * 基于element-ui $confirm 详细文档：https://element.eleme.cn/#/zh-CN/component/message-box
   * @param {*} _this 实例对象
   * @param {*} param1 title:弹框标题 text:弹框内容 okText:确定按钮内容 cancelText:取消按钮内容 htmlMessage:弹框内容是否作为HTML片段处理
   * type:消息类型（用来显示图标，默认没有图标) (success / info / warning / error)
   * callback:若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调↓
   * function(action, instance)，action 的值为'confirm', 'cancel'或'close', instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法
   * center:是否居中布局,默认为否
   * distinguishCancelAndClose:是否将取消（点击取消按钮）与关闭（点击关闭按钮或遮罩层）进行区分
   * closeOnClickModal:是否可通过点击遮罩关闭 MessageBox
   */
  elConfirm(_this, { title = '警告', text = '这是一个警告框', okText = '确定', cancelText = '取消', htmlMessage = false, type, callback, center = false, distinguishCancelAndClose = false, closeOnClickModal = true }) {
    return new Promise((resolve, reject) => {
      _this.$confirm(text, title, {
        confirmButtonText: okText,
        cancelButtonText: cancelText,
        dangerouslyUseHTMLString: htmlMessage,
        type: type,
        callback: callback,
        center: center,
        distinguishCancelAndClose: distinguishCancelAndClose,
        closeOnClickModal: closeOnClickModal
      }).then(() => {
        resolve()
      }).catch(() => {
        reject()
      })
    })
  },

  /**
   * 根据权限 修改页面
   * @param {*} routers 路由表
   */
  addRouters(routers) {
    console.log('天才第一步')
    addRouter(routers)
  }
}

export default fw

