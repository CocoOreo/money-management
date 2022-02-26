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

export const addRecord = (data) => {
  return request({
    url: '/add-record',
    method: 'POST',
    data
  })
}
