import style from './style.module.scss'
import React, { useState } from 'react'
import {
  List,
  Cell,
  Icon,
  Overlay,
  NumberKeyboard,
  SwipeCell,
  Button
} from 'react-vant'
import { getMonthWord } from 'utils/base'
import { useSearchParams } from 'react-router-dom'

// Prop Type Example
// list = [
//   {
//     month: 12,
//     year: 2022,
//     day: 13,
//     amount: 298,
//     list:[
//       {
//         category: 'gift',
//         icon: 'gift',
//         amout: 13
//       }
//     ]
//   },
//   {
//     xxx
//   }
// ]

export const ExpenseList = ({
  list,
  onClickIcon,
  onClickAmount,
  onClickEnter,
  onClickDelete
}) => {
  const [showOverlay, setShowOverlay] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [showKeyboard, setShowKeyboard] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState('')
  const handleClickIcon = (item) => {
    console.log(searchParams)
    setSearchParams({ id: item.id })
    onClickIcon(item)
  }
  const handleClickAmount = (item) => {
    setSearchParams({ id: item.id })
    setShowKeyboard(true)
    setShowOverlay(true)
    onClickAmount(item)
  }
  const closeOverlay = () => {
    setSearchParams({})
    setShowOverlay(false)
  }
  const handleEnter = () => {
    setShowOverlay(false)
    if (value) {
      const param = {
        id: searchParams.get('id'),
        amount: Number(value)
      }
      try {
        onClickEnter({ ...param })
      } catch (err) {
        console.log(err)
      }
    }
  }
  const onKeyboardChange = (num) => {
    console.log('INPUT', num)
    if (num.indexOf('.') !== num.length - 1 && num[num.length - 1] === '.') {
      setValue(num.slice(0, num.length - 1))
      return
    }
    setValue(num)
  }
  const handleKeyboardBlur = () => {
    setValue('')
    setShowKeyboard(false)
  }

  const beforeClose = ({ position }) => {
    switch (position) {
      case 'left':
      case 'cell':
      case 'outside':
        return true
      case 'right':
        onClickDelete({ id: searchParams.get('id') })
        return true

      default:
        return true
    }
  }
  return (
    <div className={style['expense-list']}>
      <List>
        {list.length ? (
          list.map((item, index) => {
            return (
              <div key={index}>
                <Cell>
                  <div className={style['title-wrapper']}>
                    <div>
                      {getMonthWord(item.month)} {item.day}
                    </div>
                    <div>
                      {item.amount > 0 ? (
                        `Income: $${item.amount}`
                      ) : (
                        `Expense: $${-item.amount}`
                      )}
                    </div>
                  </div>
                  <div className={style['list-wrapper']}>
                    {item.list.length ? (
                      item.list.map((item, index) => {
                        return (
                          <SwipeCell
                            beforeClose={beforeClose}
                            key={index}
                            rightAction={
                              <div
                                style={{ height: '100%', padding: '0 10px ' }}>
                                <Button
                                  style={{
                                    height: '80%',
                                    width: '100%',
                                    position: 'relative',
                                    left: '2px',
                                    top: '50%',
                                    transform: 'translate3d(0, -50%, 0)'
                                  }}
                                  square
                                  type="danger"
                                  onClick={onClickDelete}>
                                  Delete
                                </Button>
                              </div>
                            }>
                            <div
                              className={
                                Number(searchParams.get('id')) === item.id ? (
                                  `${style['item-wrapper']} ${style.highlight}`
                                ) : (
                                  `${style['item-wrapper']}`
                                )
                              }>
                              <div className={style.left}>
                                <div
                                  className={style['icon-wrapper']}
                                  onClick={() => handleClickIcon(item)}>
                                  <Icon name={item.icon} />
                                </div>
                                <div className={style['category-wrapper']}>
                                  {item.category}
                                </div>
                              </div>
                              <div
                                className={style.right}
                                onClick={() => handleClickAmount(item)}>
                                <div>
                                  {item.type ? (
                                    `+${item.amount}`
                                  ) : (
                                    `-${item.amount}`
                                  )}
                                </div>
                              </div>
                            </div>
                          </SwipeCell>
                        )
                      })
                    ) : null}
                  </div>
                </Cell>
              </div>
            )
          })
        ) : null}
      </List>
      <Overlay visible={showOverlay} zIndex={110} onClick={closeOverlay} />
      <div
        className={style['amount-popup']}
        style={showKeyboard ? { display: 'block' } : { visibility: 'hidden' }}>
        <div className={style['amount-wrapper']}>Amount: ${value}</div>
      </div>
      <NumberKeyboard
        theme="custom"
        extraKey="."
        value={value}
        closeButtonText="Enter"
        visible={showKeyboard}
        onBlur={handleKeyboardBlur}
        onClose={handleEnter}
        onChange={onKeyboardChange}
        zIndex={120}
      />
    </div>
  )
}
