import { request } from './base'

export const addRecord = (data) => {
  return request({
    url: '/record',
    method: 'POST',
    data
  })
}
