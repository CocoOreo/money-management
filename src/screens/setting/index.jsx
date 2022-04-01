import { ShadowCard } from 'components/shadow-card'
import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { Header } from './components/header.jsx'
import { getFraction, getInteger, getMonthWord, getDate } from 'utils/base'
import { useMonthlyBalance } from './useMonthlyBalance'
import { Loading, Circle, Button, NumberKeyboard } from 'react-vant'
import { useGetBudget, usePatchBudget } from './useBudget'

export const SettingScreen = () => {
  const { month: currentMonth, year: currentYear } = getDate()
  const [showKeyboard, setShowKeyboard] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState('')
  const { data: monthlyBalance, isLoading } = useMonthlyBalance({
    month: currentMonth,
    year: currentYear
  })
  const { mutate: patchBudget } = usePatchBudget()
  const { data: budget, isLoading: isBudgetLoading } = useGetBudget()
  const [rate, setRate] = useState(0)

  const onClickEdit = () => {
    setShowKeyboard(true)
  }
  const handleEnter = () => {
    if (value) {
      console.log('value =>', value)
      const param = {
        budget: Number(value)
      }
      try {
        patchBudget({ ...param })
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
  useEffect(
    () => {
      if (budget) {
        console.log('Budget', budget)
        console.log('HEllo')
        const expense = monthlyBalance.expense
        setRate(getInteger(expense / budget.budget * 100))
        console.log(rate)
      }
    },
    [budget]
  )

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
                  padding: '18px 0px 0px 26px'
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
            <ShadowCard width={'94%'} height={200} radius={8}>
              <div className={style['budget-wrapper']}>
                <div className={style.header}>
                  <p>Budget</p>
                  <Button
                    size="small"
                    icon={'records'}
                    color="#fdda44"
                    text="EDIT"
                    onClick={onClickEdit}
                  />
                </div>
                <div className={style.body}>
                  <div className={style.circle}>
                    <Circle
                      color={{
                        '0%': '#fdda44',
                        '100%': '#f66349'
                      }}
                      rate={rate}
                      strokeWidth={80}
                      size={100}
                      text={100 - rate > 0 ? `Rest ${100 - rate}%` : 'Over'}
                    />
                  </div>
                  <div className={style.rest}>
                    <p>Balance:</p>
                    {isLoading || isBudgetLoading ? (
                      <Loading />
                    ) : (
                      <p>
                        {' '}
                        ${getInteger(budget.budget - monthlyBalance.expense)}
                        <span>
                          .{getFraction(budget.budget - monthlyBalance.expense)}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className={style.budget}>
                    <p>Budget: </p>
                    {isLoading || isBudgetLoading ? (
                      <Loading />
                    ) : (
                      <p>
                        {' '}
                        ${getInteger(budget.budget)}
                        <span>.{getFraction(budget.budget)}</span>
                      </p>
                    )}
                  </div>
                  <div className={style.expense}>
                    <p>Expense: </p>
                    {isLoading || isBudgetLoading ? (
                      <Loading />
                    ) : (
                      <p>
                        {' '}
                        ${getInteger(monthlyBalance.expense)}
                        <span>.{getFraction(monthlyBalance.expense)}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ShadowCard>
          </div>
          <div className={style.card}>
            <ShadowCard width={'94%'} height={140} radius={8}>
              <p className={style.aphorism}>
                <span>
                  The price of anything is the amount of life you exchange for
                  it.
                </span>
              </p>
            </ShadowCard>
          </div>
        </div>
        <div
          className={style['amount-popup']}
          style={
            showKeyboard ? { display: 'block' } : { visibility: 'hidden' }
          }>
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
        />
      </div>
    </div>
  )
}
