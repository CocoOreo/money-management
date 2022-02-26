import style from './style.module.scss'
import React, { useState } from 'react'
import { DetailHeader } from './components/detail-header'
import { ExpenseList } from 'components/expense-list'
import { useMonthlyBalance } from './useMonthlyBalance'
import { useDetailList } from './useDetailList.js'
import { getDate } from 'utils/base'
import { Loading } from 'react-vant'
import { useDispatch } from 'react-redux'
import { recordSlice } from 'store/slices/recordSlice'

export const DetailScreen = () => {
  const { month, year } = getDate()
  const dispatch = useDispatch()
  const [currentMonth, setCurrentMonth] = useState(month)
  const [currentYear, setCurrentYear] = useState(year)
  const { data: monthlyBalance, isLoading } = useMonthlyBalance({
    month: currentMonth,
    year: currentYear
  })
  const { data: detailList, isLoading: isListLoading } = useDetailList()
  const onClickIcon = (item) => {
    dispatch(recordSlice.actions.setShowAddModal(true))
  }
  const onClickAmount = (item) => {
    console.log(item)
  }
  return (
    <div style={{ bottom: '100px', backgroundColor: '#FFF' }}>
      <DetailHeader
        props={{
          monthlyBalance: monthlyBalance,
          setCurrentMonth,
          setCurrentYear,
          currentYear,
          currentMonth,
          isLoading
        }}
      />
      <div className={style['detail-list']}>
        {isListLoading ? (
          <Loading />
        ) : (
          <ExpenseList
            onClickIcon={onClickIcon}
            onClickAmount={onClickAmount}
            list={detailList}
          />
        )}
      </div>
    </div>
  )
}
