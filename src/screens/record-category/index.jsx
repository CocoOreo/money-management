import React, { useState } from 'react'
import { Popup, Tabs } from 'react-vant'
// import { WarningO } from '@react-vant/icons'
import { useDispatch, useSelector } from 'react-redux'
import { recordSlice } from 'store/slices/recordSlice'
import style from './style.module.scss'
import { CategoryList } from 'components/category-list'
export const RecordCategoryScreen = () => {
  const showCategoryModal = useSelector(
    (state) => state.record.showCategoryModal
  )
  const dispatch = useDispatch()
  const close = () => {
    dispatch(recordSlice.actions.setShowAddModal(false))
  }
  const [status] = useState(0)

  const expenseTab = {
    name: 'expense',
    list: [
      { name: 'warning', desc: 'Grocery' },
      { name: 'warning', desc: 'Shopping' },
      { name: 'warning', desc: 'Commute' },
      { name: 'warning', desc: 'Travel' },
      { name: 'warning', desc: 'Medicine' },
      { name: 'warning', desc: 'Study' },
      { name: 'warning', desc: 'Clothing' },
      { name: 'warning', desc: 'Housing' },
      { name: 'warning', desc: 'Food' },
      { name: 'warning', desc: 'Electronics' },
      { name: 'warning', desc: 'Entertainment' },
      { name: 'warning', desc: 'Vehicles' }
    ]
  }

  const incomeTab = {
    name: 'income',
    list: [
      { name: 'warning', desc: 'Business' },
      { name: 'warning', desc: 'Interest' },
      { name: 'warning', desc: 'Cashback' },
      { name: 'warning', desc: 'Salary' },
      { name: 'warning', desc: 'Other' }
    ]
  }

  const onClickIcon = (item) => {
    console.log(item)
    // http
  }

  return (
    <div>
      <Popup
        position="bottom"
        visible={showCategoryModal}
        style={{ height: '100%' }}>
        <div onClick={close}>Close</div>
        <div className={style['header-wrapper']}>
          Header {status}
          <Tabs active={0}>
            {[expenseTab, incomeTab].map((item, index) => (
              <Tabs.TabPane key={index} title={item.name}>
                <div className={style['category-list']}>
                  <CategoryList
                    type={0}
                    onClick={(param) => onClickIcon(param)}
                    list={item.list}
                  />
                </div>
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      </Popup>
    </div>
  )
}
