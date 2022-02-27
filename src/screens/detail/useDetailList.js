import { useQuery } from 'react-query'
import { getDetailList } from 'service/detail'
export const useDetailList = (param) => {
  // Pay attention, you must use () => getXXX()
  // In this case, the arrow function will return the getXXX to make it a parameter rather than excuted it immediately
  return useQuery(['detail-list'], () => getDetailList(param))
}
