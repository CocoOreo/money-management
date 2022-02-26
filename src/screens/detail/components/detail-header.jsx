import React, { useState } from 'react'
import style from './detail.header.module.scss'
import { ShadowCard } from 'components/shadow-card/index'
import { getFraction, getInteger, getMonthWord } from 'utils/base'
import { Icon, DatetimePicker, Popup, Loading } from 'react-vant'

export const DetailHeader = ({ props }) => {
  const {
    monthlyBalance,
    setCurrentMonth,
    currentYear,
    currentMonth,
    setCurrentYear,
    isLoading
  } = props
  const [showDatePicker, setShowDatePicker] = useState(false)
  const onConfirm = (dates) => {
    setShowDatePicker(!showDatePicker)
    const selectedMonth = dates.getMonth() + 1
    const selectedYear = dates.getFullYear()
    if (selectedYear === currentYear && selectedMonth === currentMonth) {
      return
    }
    setCurrentMonth(selectedMonth)
    setCurrentYear(selectedYear)
  }
  return (
    <div>
      <div className={style['header-wrapper']}>
        <div className={style['logo-wrapper']}>
          <h1>Turbo Money</h1>
        </div>
        <div className={style['detail-wrapper']}>
          <div className={style.calendar}>
            <div
              style={{ textAlign: 'start', paddingLeft: '30%' }}
              onClick={() => setShowDatePicker(!showDatePicker)}>
              <div className={style.title}>{currentYear}</div>
              <div className={style.content}>
                {` ${getMonthWord(currentMonth)} `}
                <Icon name="arrow-down" />
              </div>
            </div>
          </div>
          <div className={style.detail}>
            <div style={{ textAlign: 'start', paddingLeft: '36%' }}>
              <div className={style.title}>Income</div>
              {isLoading ? (
                <Loading />
              ) : (
                <div className={style.content}>
                  ${getInteger(monthlyBalance.income)}
                  <span>.{getFraction(monthlyBalance.income)}</span>
                </div>
              )}
            </div>
          </div>
          <div className={style.detail}>
            <div style={{ textAlign: 'start', paddingLeft: '36%' }}>
              <div className={style.title}>Expense</div>
              {isLoading ? (
                <Loading />
              ) : (
                <div className={style.content}>
                  ${getInteger(monthlyBalance.expense)}
                  <span>.{getFraction(monthlyBalance.expense)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={style['bar-wrapper']}>
          <ShadowCard width={'94%'} height={75} radius={8}>
            <div className={style['icon-wrapper']}>
              <div className={style.icon}>
                <Icon name="add-o" />
                <div>Add</div>
              </div>
              <div className={style.icon}>
                <Icon name="balance-list-o" />
                <div>Chart</div>
              </div>
              <div className={style.icon}>
                <Icon name="bar-chart-o" />
                <div>Rank</div>
              </div>
            </div>
          </ShadowCard>
        </div>
      </div>
      <Popup
        visible={showDatePicker}
        round
        position="bottom"
        style={{ height: '36%' }}
        onClose={() => setShowDatePicker(!showDatePicker)}>
        <DatetimePicker
          type="year-month"
          visible={showDatePicker}
          onConfirm={onConfirm}
          confirmButtonText={'OK'}
          cancelButtonText={'Cancel'}
          minDate={new Date(new Date().getFullYear() - 2, 1, 0)}
          maxDate={new Date()}
          value={new Date()}
        />
      </Popup>
    </div>
  )
}
