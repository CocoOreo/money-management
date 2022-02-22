import { CalendarHeader } from 'components/calendar-header'
import { LineChart } from 'components/line-chart'
import React, { useState } from 'react'
import { statusSlice } from 'store/slices/statusSlice'
import { useDispatch, useSelector } from 'react-redux'

export const ChartScreen = () => {
  const currentType = useSelector((state) => state.status.type)
  const currentScope = useSelector((state) => state.status.scope)
  const [xAixis] = useState([1, 2, 3, 4, 5, 6])
  const [tabs] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
  const [chartData] = useState([130, 240, 270, 60, 100, 24])

  const dispatch = useDispatch()

  const onTypeChange = (param) => {
    const { type } = param
    dispatch(statusSlice.actions.setType(type))
  }
  const onScopeChange = (param) => {
    dispatch(statusSlice.actions.setScope(param.index))
  }
  return (
    <div>
      <CalendarHeader
        onScopeChange={onScopeChange}
        onTypeChange={onTypeChange}
        currentScope={currentScope}
        currentType={currentType}
      />
      <LineChart xAxisData={xAixis} tabs={tabs} seriesData={chartData} />
    </div>
  )
}
