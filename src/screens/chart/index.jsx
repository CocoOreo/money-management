import { CalendarHeader } from 'components/calendar-header'
import React from 'react'
import { statusSlice } from 'store/slices/statusSlice'
import { useDispatch, useSelector } from 'react-redux'

export const ChartScreen = () => {
  const currentType = useSelector((state) => state.status.type)
  const currentScope = useSelector((state) => state.status.scope)
  const dispatch = useDispatch()

  const onTypeChange = (param) => {
    console.log('onTypechange =>', param)
    dispatch(statusSlice.actions.setType(param.type))
  }
  const onScopeChange = (param) => {
    console.log('onScopechange =>', param)
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
      <div>Chart Screen</div>
    </div>
  )
}
