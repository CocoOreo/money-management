import { useMutation, useQueryClient } from 'react-query'
import { deleteRecord, editRecord } from 'service/record'

export const useDeleteRecord = () => {
  const queryClient = useQueryClient()
  return useMutation((param) => deleteRecord(param), { onSuccess: () => { queryClient.invalidateQueries('detail-list'); queryClient.invalidateQueries('monthly-balance') } })
}

export const useEditRecord = () => {
  const queryClient = useQueryClient()
  // Pay attention, you must use () => getXXX()
  // In this case, the arrow function will return the getXXX to make it a parameter rather than excuted it immediately
  return useMutation((param) => editRecord(param), { onSuccess: () => { queryClient.invalidateQueries('detail-list'); queryClient.invalidateQueries('monthly-balance') } })
}
