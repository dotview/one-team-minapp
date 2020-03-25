// import qs from 'qs' // 创建fly实例
import { getCurrentPageUrl } from '../utils/index'
const Fly = require('flyio/dist/npm/wx') // npm引入方式
// import Fly from 'flyio'
const fly = new Fly()

const handleError = (data) => {
  if (data.code === '-1999') {
    let page = encodeURIComponent(getCurrentPageUrl())
    wx.redirectTo({
      url: '/pages/login/main?url=' + page
    })
    return
  }
  wx.showToast({
    title: data.des || data.error,
    icon: 'none',
    duration: 2000
  })
  return Promise.reject(data)
}

/**
 * 说明：
 * 如果接口success :true ,直接返回 result ,(如果 想要完整数据，传入format:false即可)
 * success :false ,会返回
 */
const formatRes = (res) => {
  if (res.success || (res.status && res.status === 'success')) {
    let result = res.result || res.data
    return Promise.resolve(result)
  }
}

fly.config.timeout = 10 * 1000
// 服务器origin
fly.config.baseURL = process.env.API_BASE_URL

// 添加请求拦截器
fly.interceptors.request.use((request) => {
  // console.log(request)
  request.withCredentials = true
  request.headers.Authorization = `Bearer ${wx.getStorageSync('token')}`
  if (request.loading) {
    wx.showLoading({ title: '拼命加载中...' })
  }
  return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use((response) => {
  // console.log(response)
  wx.hideLoading()
  let resData = response.data
  let requestData = response.request
  if (requestData.handleError && ((!resData.success && !resData.status) || (resData.status && resData.status !== 'success'))) {
    return handleError(resData)
  }
  return requestData.format ? formatRes(resData) : resData
  // 只将请求结果的data字段返回
}, (err) => {
  wx.hideLoading()
  // 发生网络错误后会走到这里
  return Promise.reject(err)
})

// get 请求
export const getProsime = (url, data = {}, { format = true, loading = true, handleError = true, ...other } = {}) => {
  return fly.get(url, data, { format, loading, handleError, ...other }).then(response => {
    return Promise.resolve(response)
  }).catch(error => {
    return Promise.reject(error)
  })
}
// post 请求 qs.stringify(data)
export const postProsime = (url, data = {}, { format = true, loading = true, handleError = true, ...other } = {}) => {
  return fly.post(url, data, { format, loading, handleError, ...other }).then(response => {
    return Promise.resolve(response)
  }).catch(error => {
    return Promise.reject(error)
  })
}
export const patchProsime = (url, data = {}, { format = true, loading = true, handleError = true, ...other } = {}) => {
  return fly.patch(url, data, { format, loading, handleError, ...other }).then(response => {
    return Promise.resolve(response)
  }).catch(error => {
    return Promise.reject(error)
  })
}
export const putProsime = (url, data = {}, { format = true, loading = true, handleError = true, ...other } = {}) => {
  return fly.put(url, data, { format, loading, handleError, ...other }).then(response => {
    return Promise.resolve(response)
  }).catch(error => {
    return Promise.reject(error)
  })
}
export const deleteProsime = (url, data = {}, { format = true, loading = true, handleError = true, ...other } = {}) => {
  return fly.delete(url, data, { format, loading, handleError, ...other }).then(response => {
    return Promise.resolve(response)
  }).catch(error => {
    return Promise.reject(error)
  })
}
