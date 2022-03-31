import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getBudget, patchBudget } from 'service/budget'

export const useGetBudget = (param) => {
  // Pay attention, you must use () => getXXX()
  // In this case, the arrow function will return the getXXX to make it a parameter rather than excuted it immediately
  return useQuery(['budget', param], () => getBudget(param))
}

export const usePatchBudget = () => {
  const queryClient = useQueryClient()
  return useMutation((param) => patchBudget(param), { onSuccess: () => { queryClient.invalidateQueries('budget') } })
}
