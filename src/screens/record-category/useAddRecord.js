import { useMutation, useQueryClient } from 'react-query'
import { addRecord } from 'service/record'

export const useAddRecord = () => {
  const queryClient = useQueryClient()
  // Pay attention, you must use () => getXXX()
  // In this case, the arrow function will return the getXXX to make it a parameter rather than excuted it immediately
  return useMutation((param) => addRecord(param), { onSuccess: () => { queryClient.invalidateQueries('detail-list'); queryClient.invalidateQueries('monthly-balance') } })
}
