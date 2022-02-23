import style from './style.module.scss'
import React from 'react'
import { List, Cell, Icon, Progress } from 'react-vant'

export const RankList = ({ rank }) => {
  return (
    <div className={style['rank-list']}>
      <List>
        <Cell>
          <div className={style.title}>
            <p>{rank.type === 0 ? 'Expense Rank' : 'Income Rank'}</p>
          </div>
          <div className={style['list-wrapper']}>
            {rank.list.length ? (
              rank.list.map((item, index) => {
                return (
                  <div className={style['item-wrapper']} key={index}>
                    <div className={style['icon-wrapper']}>
                      <Icon name={item.icon} />
                    </div>
                    <div className={style['category-wrapper']}>
                      {item.category}
                      <span>{item.percentage}%</span>
                    </div>
                    <div className={style['progress-wrapper']}>
                      <Progress
                        color="#FDDA41"
                        percentage={item.percentage}
                        pivotText=""
                      />
                    </div>
                    <div className={style['amount-wrapper']}>{item.amount}</div>
                  </div>
                )
              })
            ) : null}
          </div>
        </Cell>
      </List>
    </div>
  )
}
