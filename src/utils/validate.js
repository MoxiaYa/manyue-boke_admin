/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
  return /^1[3|4|5|7|8|9]\d{9}$/.test(s)
}
/**
 * 手机以及固定电话
 * @param {*} s
 */
export function isMobileAndPhone(s) {
  return /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[3456789]\d{9})$)/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 验证密码
 *  @param  content
 */
export function checkPass(content, callBack) {
  console.log('c', content)
  if (!content) {
    if (callBack) {
      callBack(new Error('请输入6-20密码数字或字母'))
    }
    return false
  }
  const rule = /^[A-Za-z0-9]+$/
  if (!rule.test(content)) {
    if (callBack) {
      callBack(new Error('请输入6-20密码数字或字母'))
    }
    return false
  }
  if (content.length < 6) {
    if (callBack) {
      callBack(new Error('请输入6-20密码数字或字母'))
    }
    return false
  }
  if (callBack) callBack()
  return true
}

/**
 * 判断地址select组件是否为空
 * @param province
 * @param city
 * @param area
 * @param areaData 区域Code
 * @paran areaLen 区域列表长度  用于判断当前选中市是否有区域数据
 * 710000 810000 820000 特别行政区没有area
 */
export function checkAddress(province, city, area, areaData, areaLen) {
  if (!areaData) return false
  const code = areaData.toString().substr(0, 2)
  const arr = ['71', '81', '82']
  if (arr.includes(code)) {
    if (province && city) {
      return true
    }
  }
  if (province && city && !area && areaLen === 0) { // 如果省市有数据，但是区域列表无数据
    return true
  }
  if (!province || !city || !area) {
    return false
  }
  return true
}

/**
 * 价格输入限制2位小数
 * @param value
 * that this对象
 * key dataForm
 */
/**
 * 价格输入限制2位小数
 * @param data
 * callBack
 * tip
 * canEmpty  是否允许空值 默认必填
 */
export function checkPrice(data, callback, tip, canEmpty = false) {
  if (!data && canEmpty) {
    callback()
  } else if (!data && !canEmpty) {
    callback(new Error(tip))
  } else if (data < 0) {
    callback(new Error('设置限制：大于0'))
  } else if (!/^\d+(\.\d{1,2})?$/.test(data)) {
    callback(new Error('设置限制：最多输入两位小数点'))
  } else {
    callback()
  }
}

/**
 * 限制正整数
 * @param data
 * callBack
 * tip
 * canEmpty  是否允许空值 默认必填
 */
export function checkInt(data, callback, tip, canEmpty = false) {
  if (!data && canEmpty) {
    callback()
  } else if (!data && !canEmpty) {
    callback(new Error(tip))
  } else if (data < 0) {
    callback(new Error('设置限制：大于0'))
  } else if (!/^[1-9][0-9]*$/.test(data)) {
    callback(new Error('设置限制：只能输入正整数'))
  } else {
    callback()
  }
}
/**
 * 限制排序不能为负数
 * @param value
 * callback
 */
export function checkOrderNum(value, callback) {
  if (value === '') {
    callback(new Error('排序不能为空'))
  } else if (!/^(0|[1-9][0-9]*)$/.test(value)) {
    callback(new Error('排序只能为正整数'))
  } else {
    callback()
  }
}
/**
 * 限制标题 只能5个字符 并且不能为空
 * @param value 必填 String
 * tip 提示  必填 String
 * maxLength 必填 Number
 * callback 必填 Function
 */
export function checkTitle(value, callback, tip, maxLength = 5) {
  if (!value) {
    callback(new Error(tip))
  } else if (value.length > maxLength) {
    callback(new Error(`不能超过${maxLength}个字符`))
  } else {
    callback()
  }
}

