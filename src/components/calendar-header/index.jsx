import React, { useState } from 'react'
import { Icon } from 'react-vant'
import style from './style.module.scss'

// Calendar Header
// props: onTypeChange: Trigger callback function when change income or expense
// props: onScopeChange: Trigger callback function when change calendar(week, month or year)

export const CalendarHeader = (props) => {
  const { onScopeChange, onTypeChange, currentScope, currentType } = props
  console.log('current =>', currentScope, currentType)
  const [scope, setScope] = useState(currentScope)
  const [type, setType] = useState(currentType)

  const tabs = ['WEEK', 'MONTH', 'YEAR']
  const handleChangeScope = (index, callback) => {
    if (index === scope) return
    setScope(index)
    if (typeof callback === 'function') {
      const param = {
        index,
        name: tabs[index]
      }
      callback(param)
    }
  }
  const handleChangeType = (type, callback) => {
    setType(Number(!type))
    if (typeof callback === 'function') {
      const param = {
        type,
        name: type ? 'Income' : 'Expense'
      }
      callback(param)
    }
  }
  return (
    <div className={style['calendar-header']}>
      <div
        className={style.type}
        onClick={() => handleChangeType(type, onTypeChange)}>
        <span style={{ marginRight: '5px' }}>
          {type === 0 ? 'EXPENSE' : 'INCOME'}
        </span>
        <Icon name="exchange" />
      </div>
      <div className={style.calendar}>
        {tabs.map((item, index) => {
          return (
            <div
              className={
                scope === index ? (
                  `${style.active} ${style.cell}`
                ) : (
                  ` ${style.cell}`
                )
              }
              key={index}
              onClick={() => handleChangeScope(index, onScopeChange)}>
              <span> {item}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
