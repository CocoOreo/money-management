import { ShadowCard } from 'components/shadow-card'
import React from 'react'
import style from './style.module.scss'
import { Header } from './components/header.jsx'
import { getFraction, getInteger, getMonthWord, getDate } from 'utils/base'
import { useMonthlyBalance } from './useMonthlyBalance'
import { Loading } from 'react-vant'

export const SettingScreen = () => {
  const { month: currentMonth, year: currentYear } = getDate()
  const { data: monthlyBalance, isLoading } = useMonthlyBalance({
    month: currentMonth,
    year: currentYear
  })
  return (
    <div>
      <div className={style.user}>
        <div className={style['header-wrapper']}>
          <Header />
        </div>
        <div className={style['card-wrapper']}>
          <div className={style.card}>
            <ShadowCard width={'94%'} height={110} radius={8}>
              <div
                style={{
                  fontSize: '18px',
                  textAlign: 'start',
                  padding: '18px 0px 0px 26px',
                  fontFamily: 'fantasy'
                }}>
                BILL
              </div>
              <div className={style['detail-wrapper']}>
                <div className={style.calendar}>
                  <div style={{ textAlign: 'start', paddingLeft: '30%' }}>
                    <div className={style.title}>{currentYear}</div>
                    <div className={style.content}>
                      {` ${getMonthWord(currentMonth)} `}
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
            </ShadowCard>
          </div>
          <div className={style.card}>
            <ShadowCard width={'94%'} height={120} radius={8}>
              BILL
            </ShadowCard>
          </div>
          <div className={style.card}>
            <ShadowCard width={'94%'} height={140} radius={8}>
              BILL
            </ShadowCard>
          </div>
        </div>
      </div>
    </div>
  )
}
