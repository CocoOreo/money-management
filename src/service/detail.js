import { request } from './base'

export const getMonthlyBalance = (data) => {
  return request({
    url: '/monthly-balance',
    method: 'GET',
    data
  })
}

export const getDetailList = (data) => {
  return request({
    url: '/detail-list',
    method: 'GET',
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
