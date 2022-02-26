import { useQuery } from 'react-query'
import { addRecord } from 'service/detail'
export const useMonthlyBalance = (param) => {
  // Pay attention, you must use () => getXXX()
  // In this case, the arrow function will return the getXXX to make it a parameter rather than excuted it immediately
  return useQuery(['add-record', param], () => param)
}
