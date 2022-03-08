import { useQuery } from 'react-query'
import { getValidChoices } from 'service/chart'
export const useValidChoices = (param) => {
  // Pay attention, you must use () => getXXX()
  // In this case, the arrow function will return the getXXX to make it a parameter rather than excuted it immediately
  return useQuery(['valid-choices', param], () => getValidChoices(param))
}
