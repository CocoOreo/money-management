import { request } from './base'

const localStorageKey = '__auth_token__'

export const handleUserResponse = ({ user }) => {
  console.log(user)
  window.localStorage.setItem(localStorageKey, user?.token || '')
  return user
}

export const getToken = () => {
  return window.localStorage.getItem(localStorageKey)
}

export const login = async (data) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data
  }).then(res => {
    return handleUserResponse(res)
  }).catch(error => {
    throw new Error(error)
  })
}

export const register = async (data) => {
  return request('/api/login', {
    method: 'POST',
    data
  }).then(res => {
    return handleUserResponse(res)
  }).catch(error => {
    throw new Error(error)
  })
}

export const logout = async () => {
  window.localStorage.removeItem(localStorageKey)
}
