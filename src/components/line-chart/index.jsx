import React, { useState } from 'react'
import style from './style.module.scss'
import { Tabs } from 'react-vant'
import ReactECharts from 'echarts-for-react'
// import { getDate } from 'utils/base'

// Calendar Header
// props: onTypeChange: Trigger callback function when change income or expense
// props: onScopeChange: Trigger callback function when change calendar(week, month or year)

export const LineChart = (props) => {
  const { tabs, xAxisData, seriesData } = props
  const [tabList] = useState(tabs || [])
  const options = {
    color: ['#5F5F5F'],
    grid: { height: 120, top: 8, right: 10, bottom: 24, left: 10 },
    legend: {
      height: 80,
      width: 10
    },
    xAxis: {
      type: 'category',
      data: xAxisData
    },
    yAxis: {
      show: false
    },
    series: [
      {
        data: seriesData,
        type: 'line'
      }
    ],
    tooltip: {
      trigger: 'axis'
    }
  }
  // const { year, month, day } = getDate()
  return (
    <div className={style['line-chart']}>
      <div className={style['tab-container']}>
        <Tabs titleInactiveColor="#9F9F9F" titleActiveColor="black" active={0}>
          {tabList.map((item) => (
            <Tabs.TabPane key={item} title={`Tab ${item}`}>
              <div className={style['chart-wrapper']}>
                <div className={style.balance}>
                  <p>Total: </p>
                  <p>Average: </p>
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
