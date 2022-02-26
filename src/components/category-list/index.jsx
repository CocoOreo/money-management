import React, { useState } from 'react'
import { Icon, NumberKeyboard, Calendar, ConfigProvider } from 'react-vant'
import locale from './enUs'
import style from './style.module.scss'

export const CategoryList = (props) => {
  const { list, onClick, type } = props
  const [visibleNum, setNumVisible] = useState(false)
  const [visibleDate, setDateVisible] = useState(false)
  const handleClick = (param) => {
    if (type === 0) {
      setNumVisible(true)
    } else if (type === 1) {
      onClick(param)
    }
  }
  const onInput = (v) => {
    console.log(v)
    if (v === 'Date') {
      setDateVisible(true)
    }
  }
  const onDelete = () => {
    console.log('Delete')
  }

  return (
    <div className={style['list-wrapper']}>
      {list.map((item, index) => {
        return (
          <div key={index} className={style['icon-block']}>
            <div className={style.icon}>
              <Icon name={item.name} onClick={() => handleClick(item.name)} />
            </div>
            <p>{item.desc}</p>
          </div>
        )
      })}

      <NumberKeyboard
        theme="custom"
        extraKey={['.', 'Date']}
        closeButtonText="Enter"
        visible={visibleNum}
        onBlur={() => setNumVisible(false)}
        onInput={(param) => onInput(param)}
        onDelete={() => onDelete()}
      />

      <ConfigProvider locale={locale}>
        <Calendar visible={visibleDate} onClose={() => setDateVisible(false)} />
      </ConfigProvider>
    </div>
  )
}
