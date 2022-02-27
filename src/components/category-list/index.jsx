import React, { useState } from 'react'
import { Icon, NumberKeyboard, Calendar, ConfigProvider } from 'react-vant'
import { getMonthWord } from 'utils/base'
// import locale from './enUs'
import style from './style.module.scss'

export const CategoryList = (props) => {
  const { list, type, onFinish } = props
  const [selected, setSelected] = useState('')
  const [numStr, setNumStr] = useState('')
  const [date, setDate] = useState(new Date())
  const [showKeyboard, setShowKeyboard] = useState(false)
  const [showDate, setShowDate] = useState(false)
  const handleClickIcon = (icon) => {
    setShowKeyboard(true)
    console.log(icon)
    setSelected(icon.name)
  }
  const handleSelectDate = (param) => {
    setDate(param)
    setShowDate(false)
  }
  const handleKeyboardChange = (value) => {
    if (!isNaN(value) || value === '.') {
      setNumStr(value)
      console.log(value)
    } else {
      setShowDate(true)
    }
  }
  const handlDateClose = () => {
    setShowDate(false)
  }
  const handleKeyboardBlur = () => {
    if (!showDate) {
      setShowKeyboard(false)
      setNumStr('')
      setSelected('')
    }
  }
  const handleEnter = () => {
    console.log('Click Enter')
    if (numStr) {
      const param = {
        amount: Number(numStr),
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        type: type
      }
      onFinish(param)
    }
  }

  return (
    <div className={style['list-wrapper']}>
      {list.map((item, index) => {
        return (
          <div key={index} className={style['icon-block']}>
            <div
              className={
                selected === item.name ? (
                  `${style.icon} ${style.active}`
                ) : (
                  `${style.icon}`
                )
              }
              onClick={() => handleClickIcon(item)}>
              <Icon name={item.name} />
            </div>
            <p>{item.desc}</p>
          </div>
        )
      })}
      <div
        className={style['amount-popup']}
        style={showKeyboard ? { display: 'block' } : { visibility: 'hidden' }}>
        <div className={style['amount-wrapper']}>Amount: ${numStr}</div>
      </div>
      <NumberKeyboard
        theme="custom"
        extraKey={['.', 'DATE']}
        closeButtonText="Enter"
        value={numStr}
        onChange={handleKeyboardChange}
        visible={showKeyboard}
        onBlur={handleKeyboardBlur}
        onClose={handleEnter}
        safeAreaInsetBottom={true}
        zIndex={3000}
      />
      <ConfigProvider>
        <Calendar
          visible={showDate}
          onClose={() => {
            handlDateClose()
          }}
          weekdays={['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thur.', 'Fri.', 'Sat']}
          formatMonthTitle={(date) =>
            date.getFullYear() + '  ' + getMonthWord(date.getMonth() + 1)}
          confirmText={'Confirm'}
          cancelButtonText={'  '}
          title={'Calendar'}
          onConfirm={handleSelectDate}
          minDate={new Date(new Date().getFullYear() - 2, 1, 0)}
          maxDate={new Date()}
        />
      </ConfigProvider>
    </div>
  )
}
