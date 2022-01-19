import style from './style.module.scss'
import React from 'react'
import { List, Cell, Icon } from 'react-vant'
import { getMonthWord } from 'utils/base'

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

export const ExpenseList = ({ list }) => {
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
                          <div className={style['item-wrapper']} key={index}>
                            <div className={style.left}>
                              <div className={style['icon-wrapper']}>
                                <Icon name={item.icon} />
                              </div>
                              <div className={style['category-wrapper']}>
                                {item.category}
                              </div>
                            </div>
                            <div className={style.right}>
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
    </div>
  )
}
