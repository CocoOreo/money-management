import { useQuery } from 'react-query'
import { getRankList } from 'service/chart'
export const useRankList = (param) => {
  // Pay attention, you must use () => getXXX()
  // In this case, the arrow function will return the getXXX to make it a parameter rather than excuted it immediately
  return useQuery(['rank-list', param], () => getRankList(param))
}
