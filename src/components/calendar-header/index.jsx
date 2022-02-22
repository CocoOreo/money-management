import React, { useState } from 'react'
import { Icon } from 'react-vant'
import style from './style.module.scss'

export const CalendarHeader = (props) => {
  const [scope, setScope] = useState(0)
  const [type, setType] = useState(0)
  const tabs = ['WEEK', 'MONTH', 'YEAR']
  return (
    <div className={style['calendar-header']}>
      <div className={style.type} onClick={() => setType(!type)}>
        <span style={{ marginRight: '5px' }}>
          {type === 0 ? 'EXPENSE' : 'INCOME'}
        </span>
        <Icon name="arrow-down" />
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
              onClick={() => setScope(index)}>
              <span> {item}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
