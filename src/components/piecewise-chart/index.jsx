import React from 'react'
import style from './style.module.scss'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
// import { getDate } from 'utils/base'

// Calendar Header
// props: onTypeChange: Trigger callback function when change income or expense
// props: onScopeChange: Trigger callback function when change calendar(week, month or year)
const getVirtulData = (year) => {
  year = year || '2017'
  const date = +echarts.number.parseDate(year + '-01-01')
  const end = +echarts.number.parseDate(+year + 1 + '-01-01')
  const dayTime = 3600 * 24 * 1000
  const data = []
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.format.formatTime('yyyy-MM-dd', time),
      Math.floor(Math.random() * 10)
    ])
  }
  console.log('data', data)
  return data
}
export const PiecewiseChart = (props) => {
  const options = {
    color: ['#5F5F5F'],
    title: {
      top: 10,
      left: 'center',
      text: 'Daily Step Count'
    },
    tooltip: {},
    visualMap: {
      min: 0,
      max: 10,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 40,
      inRange: {
        color: ['#fdda44', '#f8ab6c']
      },
      itemStyle: {
        borderColor: '#FFFFFF'
      }
    },
    calendar: {
      top: 100,
      left: 50,
      right: 60,
      cellSize: [13],
      range: ['2022-01', '2022-04'],
      itemStyle: {
        borderWidth: 0.1,
        borderColor: '#FFFFFF'
      },
      yearLabel: { show: false }
    },
    legend: {},
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: getVirtulData('2022')
    }
  }

  return (
    <div className={style['piecewise-chart']}>
      <ReactECharts
        option={options}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: '500px' }}
      />
    </div>
  )
}
