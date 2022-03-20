import { useQuery } from 'react-query'
import { getBudget } from 'service/budget'
export const useGetBudget = (param) => {
  // Pay attention, you must use () => getXXX()
  // In this case, the arrow function will return the getXXX to make it a parameter rather than excuted it immediately
  return useQuery(['budget', param], () => getBudget(param))
}
