import style from './style.module.scss'
import { CalendarHeader } from 'components/calendar-header'
import { LineChart } from 'components/line-chart'
import React, { useState, useEffect } from 'react'
import { statusSlice } from 'store/slices/statusSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRankList } from './useRankList.js'
import { useValidChoices } from './useValidChoices'
import { RankList } from 'components/rank-list'
import { Loading } from 'react-vant'
import { useLineChartData } from './useLineChartData'

export const ChartScreen = () => {
  const currentType = useSelector((state) => state.status.type)
  const currentScope = useSelector((state) => state.status.scope)
  const currentYear = useSelector((state) => state.status.year)
  const currentMonth = useSelector((state) => state.status.month)
  const currentWeek = useSelector((state) => state.status.week)
  const [tabs, setTabs] = useState([])
  const { data: rankList, isLoading: isListLoading } = useRankList({
    year: currentYear,
    month: currentScope === 0 ? null : currentMonth,
    week: currentScope === 0 ? currentWeek : null,
    type: currentScope
  })
  const { data: choices } = useValidChoices()
  const { data: chartData } = useLineChartData({
    year: currentYear,
    month: currentScope === 0 ? null : currentMonth,
    week: currentScope === 0 ? currentWeek : null,
    type: currentScope
  })
  useEffect(
    () => {
      if (choices) {
        if (currentScope === 0) {
          setTabs(choices.weeks)
        } else if (currentScope === 1) {
          setTabs(choices.month)
        } else {
          setTabs(choices.year)
        }
      }
    },
    [currentScope, choices]
  )
  const dispatch = useDispatch()

  const onTypeChange = (param) => {
    const { type } = param
    dispatch(statusSlice.actions.setType(type))
  }
  const onScopeChange = (param) => {
    dispatch(statusSlice.actions.setScope(param.index))
  }
  const onTabChange = (param) => {
    if (currentScope === 0) {
      dispatch(statusSlice.actions.setWeek(param))
    } else if (currentScope === 1) {
      dispatch(statusSlice.actions.setMonth(param))
    } else {
      dispatch(statusSlice.actions.setYear(param))
    }
  }
  return (
    <div>
      <div className={style['header-wrapper']}>
        <CalendarHeader
          onScopeChange={onScopeChange}
          onTypeChange={onTypeChange}
          currentScope={currentScope}
          currentType={currentType}
        />
      </div>
      <div className={style['content-wrapper']}>
        <LineChart
          tabs={tabs}
          selectedTime={{ currentYear, currentMonth, currentWeek }}
          chartData={chartData}
          scope={currentScope}
          onChange={onTabChange}
        />
        {isListLoading ? <Loading /> : <RankList rank={rankList} />}
      </div>
    </div>
  )
}
