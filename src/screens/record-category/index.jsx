import React, { useState } from 'react'
import { Popup } from 'react-vant'
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

  return (
    <div>
      <Popup
        position="bottom"
        visible={showCategoryModal}
        style={{ height: '100%' }}>
        <div onClick={close}>Close</div>
        <div className={style['header-wrapper']}>
          Header {status}
          <buuton>Expense</buuton>
        </div>
        <div className={style['category-list']}>
          <CategoryList />
        </div>
      </Popup>
    </div>
  )
}
