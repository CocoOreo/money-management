import React, { useState } from 'react'
import {
  Icon,
  NumberKeyboard,
  Calendar,
  ConfigProvider,
  Popup
} from 'react-vant'
// import locale from './enUs'
import style from './style.module.scss'

export const CategoryList = (props) => {
  const { list, onClick, type } = props
  const [stateNum, setNumState] = useState({
    visible: false,
    value: 0
  })
  const [visibleDate, setDateVisible] = useState(false)
  const handleClick = (param) => {
    if (type === 0) {
      setNumState({ visible: true })
      onClick(param)
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
  const onSelect = (date) => {
    console.log(date)
  }
  const handlDateClose = () => {
    setDateVisible(false)
    setNumState({ visible: true })
  }

  return (
    <div className={style['list-wrapper']}>
      {list.map((item, index) => {
        return (
          <div key={index} className={style['icon-block']}>
            <div className={style.icon}>
              <Icon name={item.name} onClick={() => handleClick(item.desc)} />
            </div>
            <p>{item.desc}</p>
          </div>
        )
      })}

      <Popup position="bottom" visible={stateNum.visible} overlay={false}>
        <div>record: {stateNum.value}</div>
      </Popup>

      <NumberKeyboard
        theme="custom"
        extraKey={['.', 'Date']}
        closeButtonText="Enter"
        value={stateNum.value}
        onChange={(v) => setNumState({ value: v, visible: true })}
        visible={stateNum.visible}
        onBlur={() => setNumState({ visible: false })}
        onInput={(param) => onInput(param)}
        onDelete={() => onDelete()}
        safeAreaInsetBottom={true}
      />

      <ConfigProvider>
        <Calendar
          visible={visibleDate}
          onClose={() => {
            handlDateClose()
          }}
          onSelect={(param) => onSelect(param)}
        />
      </ConfigProvider>
    </div>
  )
}
