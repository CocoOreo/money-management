import React from 'react'
import style from './style.module.scss'
import { Tabs } from 'react-vant'
import ReactECharts from 'echarts-for-react'
import { getMonthWord } from 'utils/base'
// import { getDate } from 'utils/base'

// Calendar Header
// props: onTypeChange: Trigger callback function when change income or expense
// props: onScopeChange: Trigger callback function when change calendar(week, month or year)

export const StackedAreaChart = (props) => {
  const { tabs, chartData, scope, selectedTime, onChange } = props
  const options = {
    grid: { height: 120, top: 8, right: 10, bottom: 24, left: 10 },
    legend: {
      height: 80,
      width: 10
    },
    xAxis: {
      type: 'category',
      data: (chartData && chartData['x-axis']) || []
    },
    yAxis: {
      show: false
    },
    series: [
      {
        data: (chartData && chartData.values) || [],
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        }
      }
    ],
    tooltip: {
      trigger: 'axis'
    }
  }
  const parseTabs = (item) => {
    const last = tabs[tabs.length - 1]
    if (scope === 0) {
      return item === last
        ? 'This Week'
        : item === last - 1 ? 'Last Week' : `Week ${item}`
    } else if (scope === 1) {
      return item === last ? 'This Month' : `${getMonthWord(item)}`
    } else {
      return `Year ${item}`
    }
  }

  const isActive = () => {
    if (scope === 0) {
      return (
        selectedTime &&
        tabs.findIndex((item) => item === selectedTime.currentWeek)
      )
    } else if (scope === 1) {
      return (
        selectedTime &&
        tabs.findIndex((item) => item === selectedTime.currentMonth)
      )
    } else {
      return (
        selectedTime &&
        tabs.findIndex((item) => item === selectedTime.currentYear)
      )
    }
  }
  const handleChange = (index) => {
    onChange(tabs[index])
  }
  // const { year, month, day } = getDate()
  return (
    <div className={style['line-chart']}>
      <div className={style['tab-container']}>
        <Tabs
          titleInactiveColor="#9F9F9F"
          titleActiveColor="black"
          onChange={(index) => handleChange(index)}
          active={isActive()}>
          {tabs.map((item) => (
            <Tabs.TabPane key={item} title={parseTabs(item)}>
              <div className={style['chart-wrapper']}>
                <div className={style.balance}>
                  <p>Total: {chartData && chartData.total}$</p>
                  <p>Average: {chartData && chartData.average}$</p>
                </div>
                <ReactECharts
                  option={options}
                  notMerge={true}
                  lazyUpdate={true}
                  style={{ height: '180px' }}
                />
              </div>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
