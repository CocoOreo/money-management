import style from './style.module.scss'
import React, { useState } from 'react'
import { List, Cell, Icon, Overlay } from 'react-vant'
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

export const ExpenseList = ({ list, onClickIcon, onClickAmount }) => {
  const [showOverlay, setShowOverlay] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const handleClickIcon = (item) => {
    console.log(searchParams)
    setSearchParams({ id: item.id })
    onClickIcon(item)
  }
  const handleClickAmount = (item) => {
    setSearchParams({ id: item.id })
    setShowOverlay(true)
    onClickAmount(item)
  }
  const closeOverlay = () => {
    setSearchParams({})
    setShowOverlay(false)
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
                          <div
                            className={
                              Number(searchParams.get('id')) === item.id ? (
                                `${style['item-wrapper']} ${style.highlight}`
                              ) : (
                                `${style['item-wrapper']}`
                              )
                            }
                            key={index}>
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
    </div>
  )
}
