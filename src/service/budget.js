import { request } from './base'

export const getBudget = (data) => {
  return request({
    url: '/budget',
    method: 'GET',
    data
  })
}

export const patchBudget = (data) => {
  return request({
    url: '/budget',
    method: 'PATCH',
    data
  })
}

export const deleteBudget = (data) => {
  return request({
    url: '/budget',
    method: 'DELETE',
    data
  })
}
