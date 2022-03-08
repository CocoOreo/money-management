import style from './style.module.scss'
import { CalendarHeader } from 'components/calendar-header'
import React, { useState, useEffect } from 'react'
import { statusSlice } from 'store/slices/statusSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRankList } from './useRankList.js'
import { useValidChoices } from './useValidChoices'
import { RankList } from 'components/rank-list'
import { Loading } from 'react-vant'
import { cleanObject } from 'utils/base'
// import { StackedAreaChart } from 'components/stacked-area-chart/stacked-area-chart'
// import { useLineChartData } from './useLineChartData'
import { PieChart } from 'components/pie-chart/pie-chart'

export const RankScreen = () => {
  const currentType = useSelector((state) => state.status.type)
  const currentScope = useSelector((state) => state.status.scope)
  const currentYear = useSelector((state) => state.status.year)
  const currentMonth = useSelector((state) => state.status.month)
  const currentWeek = useSelector((state) => state.status.week)
  const [tabs, setTabs] = useState([])
  const { data: rankList, isLoading: isListLoading } = useRankList(
    cleanObject({
      year: currentScope === 2 ? currentYear : null,
      month: currentScope === 1 ? currentMonth : null,
      week: currentScope === 0 ? currentWeek : null
    })
  )
  const [pieData, setPieData] = useState([])
  useEffect(
    () => {
      if (rankList) {
        const { list } = rankList
        console.log('LIST', list)
        const chartData = list.map((item) => {
          return {
            value: item.amount,
            name: item.category
          }
        })
        console.log('chartData', chartData)
        setPieData([...chartData])
      }
    },
    [rankList]
  )
  // const { data: chartData } = useLineChartData(
  //   cleanObject({
  //     year: currentScope === 2 ? currentYear : null,
  //     month: currentScope === 1 ? currentMonth : null,
  //     week: currentScope === 0 ? currentWeek : null
  //   })
  // )
  const { data: choices } = useValidChoices()
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
        {/* <StackedAreaChart
          tabs={tabs}
          selectedTime={{ currentYear, currentMonth, currentWeek }}
          chartData={chartData}
          scope={currentScope}
          onChange={onTabChange}
        /> */}
        <PieChart
          tabs={tabs}
          selectedTime={{ currentYear, currentMonth, currentWeek }}
          chartData={pieData}
          scope={currentScope}
          onChange={onTabChange}
        />
        {isListLoading ? <Loading /> : <RankList rank={rankList} />}
      </div>
    </div>
  )
}
