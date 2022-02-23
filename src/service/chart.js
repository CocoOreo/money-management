import { request } from './base'

export const getRankList = (data) => {
  return request({
    url: '/rank-list',
    method: 'GET',
    data
  })
}
