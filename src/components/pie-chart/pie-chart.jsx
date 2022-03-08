import React from 'react'
import style from './style.module.scss'
import { Tabs } from 'react-vant'
import ReactECharts from 'echarts-for-react'
import { getMonthWord } from 'utils/base'
// import { getDate } from 'utils/base'

// Calendar Header
// props: onTypeChange: Trigger callback function when change income or expense
// props: onScopeChange: Trigger callback function when change calendar(week, month or year)

export const PieChart = (props) => {
  const { tabs, chartData, scope, selectedTime, onChange } = props
  const options = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: chartData || []
      }
    ]
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
                <ReactECharts
                  option={options}
                  notMerge={true}
                  lazyUpdate={true}
                  style={{ height: '500px' }}
                />
              </div>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
