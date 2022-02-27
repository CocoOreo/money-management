import { useMutation } from 'react-query'
export const useMonthlyBalance = (param) => {
  // Pay attention, you must use () => getXXX()
  // In this case, the arrow function will return the getXXX to make it a parameter rather than excuted it immediately
  return useMutation(['record', param], () => param)
}
