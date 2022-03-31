import { useQuery } from 'react-query'
import { getLineChartData } from 'service/chart'
export const useLineChartData = (param) => {
  // Pay attention, you must use () => getXXX()
  // In this case, the arrow function will return the getXXX to make it a parameter rather than excuted it immediately
  return useQuery(['line-chart', param], () => getLineChartData(param))
}
