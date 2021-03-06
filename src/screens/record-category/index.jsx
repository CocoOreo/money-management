/*
 * @Date: 2022-03-28 14:18:31
 * @LastEditors: Shaowei Sun
 * @LastEditTime: 2022-03-29 12:23:24
 * @FilePath: \money-management\src\screens\record-category\index.jsx
 */
import React from 'react'
import { Popup, Tabs, Icon } from 'react-vant'
// import { WarningO } from '@react-vant/icons'
import { useDispatch, useSelector } from 'react-redux'
import { recordSlice } from 'store/slices/recordSlice'
import style from './style.module.scss'
import { CategoryList } from 'components/category-list'
import { expenseTab, incomeTab } from 'config/tabs'
import { useAddRecord, useEditRecord } from './useRecord'
import { useSearchParams } from 'react-router-dom'
export const RecordCategoryScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const showCategoryModal = useSelector(
    (state) => state.record.showCategoryModal
  )
  const dispatch = useDispatch()
  const close = () => {
    if (searchParams.get('id')) {
      editRecord({
        category: searchParams.get('category'),
        _id: searchParams.get('id'),
        icon: searchParams.get('selected')
      })
    }
    dispatch(recordSlice.actions.setShowAddModal(false))

    setSearchParams({ ...searchParams.delete('selected') })
  }
  const onClickIcon = (item) => {
    console.log(item)
    // http
  }
  const { mutate: addRecord } = useAddRecord()
  const { mutate: editRecord } = useEditRecord()
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
