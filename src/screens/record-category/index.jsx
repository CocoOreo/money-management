import React from 'react'
import { Popup, Tabs, Icon } from 'react-vant'
// import { WarningO } from '@react-vant/icons'
import { useDispatch, useSelector } from 'react-redux'
import { recordSlice } from 'store/slices/recordSlice'
import style from './style.module.scss'
import { CategoryList } from 'components/category-list'
import { expenseTab, incomeTab } from 'config/tabs'
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

  return (
    <div>
      <Popup
        position="bottom"
        visible={showCategoryModal}
        style={{ height: '100%' }}>
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
                      type={0}
                      onClick={(param) => onClickIcon(param)}
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
