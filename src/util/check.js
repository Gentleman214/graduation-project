export function isMobile (num) { // 验证手机
  return /^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(num)
}
export function isEmail (email) { // 验证邮箱
  return /^([a-zA-Z0-9]+[_|_|-|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email)
}
export function isNumber (num) { // 验证数字
  return /^[0-9]*$/.test(num)
}
export function isFloat (num) { // 验证数字含1-3位小数
  return /^[0-9]+(.[0-9]{1,3})?$/.test(num)
}
export function isEmptyObject (target) {
  let key
  for (key in target) {
    return !1
  }
  return !0
}