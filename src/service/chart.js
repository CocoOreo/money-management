import { request } from './base'

export const getRankList = (data) => {
  return request({
    url: '/rank-list',
    method: 'GET',
    data
  })
}

export const getValidChoices = (data) => {
  return request({
    url: '/valid-choices',
    method: 'GET',
    data
  })
}

export const getLineChartData = (data) => {
  return request({
    url: '/line-chart',
    method: 'GET',
    data
  })
}
