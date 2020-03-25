// md5 = require('js-md5')
import md5 from 'js-md5'
import padStart from 'lodash/padStart'
export const encrypt = (data) => {
  var hash = md5.create()
  hash.update(data)
  return hash.hex()
}

export const formatNumber = (n) => {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export const login = (url) => {
  let loginUrl = '/pages/login/main'
  if (url) {
    loginUrl = `${loginUrl}?url=${encodeURIComponent(url)}`
  }

  wx.navigateTo({
    url: loginUrl
  })
}
/* global getCurrentPages */

/* 获取当前页url */
export const getCurrentPageUrl = () => {
  var pages = getCurrentPages() // 获取加载的页面
  var currentPage = pages[pages.length - 1] // 获取当前页面的对象
  var url = currentPage.route // 当前页面url
  return url
}

/* 获取当前页带参数的url */
export const getCurrentPageUrlWithArgs = () => {
  var pages = getCurrentPages() // 获取加载的页面
  var currentPage = pages[pages.length - 1] // 获取当前页面的对象
  var url = currentPage.route // 当前页面url
  var options = currentPage.options // 如果要获取url中所带的参数可以查看options

  // 拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}
/* 获取当前时间是第几周 */
export const getWeeks = (S) => {
  let today = new Date(S)
  let firstDay = new Date(today.getFullYear(), 0, 1)
  var dayOfweek = firstDay.getDay()

  let spendDay = 1
  if (dayOfweek !== 0) {
    spendDay = 7 - dayOfweek + 1
  }
  firstDay = new Date(today.getFullYear(), 0, 1 + spendDay)

  let dayMis = 24 * 60 * 60 * 1000
  let days = Math.ceil((today.valueOf() - firstDay.valueOf()) / dayMis)
  let week = Math.ceil(days / 7) + 1
  return week
}

// 格式化时间
export function formatDate(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) {
    return ''
  }
  if (typeof date === 'string') {
    date = /^\d+$/.test(date) ? parseInt(date) : date // 传入的日期可能是个纯数字组成的字符串，如"1511107200000"
    // date = new Date(date.replace(/-/g, '/'))
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  var o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  var week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
export function padStartFun(s) {
  return padStart(s, 2, '0')
}
