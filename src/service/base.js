import axios from 'axios'
import Config from '../config/index'
import { getToken } from './auth'
import qs from 'qs'

axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8'
}

// User Token
axios.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
)

axios.interceptors.response.use(
  (res) => {
    if (!res.data) {
      return Promise.resolve(res)
    }
    if (res.status === Config.SUCCESS_CODE) {
      return res.data
    }
    return Promise.reject(new Error(res.data.msg))
  }, (error) => {
    return error
  }
)

export const request = (options) => {
  const { method, data } = options
  if (!method || method.toUpperCase() === 'GET') {
    options.url += `?${qs.stringify(data)}`
  }
  return axios.request({ method: 'GET', ...options })
}
