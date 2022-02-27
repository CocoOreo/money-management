import React from 'react'
import { Popup, Tabs, Icon } from 'react-vant'
// import { WarningO } from '@react-vant/icons'
import { useDispatch, useSelector } from 'react-redux'
import { recordSlice } from 'store/slices/recordSlice'
import style from './style.module.scss'
import { CategoryList } from 'components/category-list'
import { expenseTab, incomeTab } from 'config/tabs'
import { useAddRecord } from './useAddRecord'
export const RecordCategoryScreen = () => {
  const showCategoryModal = useSelector(
    (state) => state.record.showCategoryModal
  )
  const dispatch = useDispatch()
  const close = () => {
    dispatch(recordSlice.actions.setShowAddModal(false))
  }
  const onClickIcon = (item) => {
    console.log(item)
    // http
  }
  const { mutate: addRecord } = useAddRecord()
  const onFinish = (record) => {
    console.log('record', record)
    try {
      addRecord({ ...record })
    } catch (error) {}
  }

  return (
    <div>
      <Popup
        position="left"
        visible={showCategoryModal}
        overlay={false}
        style={{ height: '100vh', width: '100vw' }}>
        <div className={style['header-wrapper']}>
          <div className={style['back-wrapper']}>
            <div onClick={close}>
              <Icon name={'arrow-left'} />
            </div>
          </div>
          <div className={style['tabs-wrapper']}>
            <Tabs active={0}>
              {[expenseTab, incomeTab].map((item, index) => (
                <Tabs.TabPane key={index} title={item.name}>
                  <div className={style['category-list']}>
                    <CategoryList
                      type={index}
                      onClick={(param) => onClickIcon(param)}
                      onFinish={onFinish}
                      list={item.list}
                    />
                  </div>
                </Tabs.TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      </Popup>
    </div>
  )
}
