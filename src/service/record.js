import { request } from './base'

export const addRecord = (data) => {
  return request({
    url: '/record',
    method: 'POST',
    data
  })
}

export const editRecord = (data) => {
  return request({
    url: '/record',
    method: 'PATCH',
    data
  })
}

export const deleteRecord = (data) => {
  return request({
    url: '/record',
    method: 'DELETE',
    data
  })
}
