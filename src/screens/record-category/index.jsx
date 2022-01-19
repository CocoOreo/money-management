import React from 'react'
import { Popup } from 'react-vant'
import { useDispatch, useSelector } from 'react-redux'
import { recordSlice } from 'store/slices/recordSlice'
export const RecordCategoryScreen = () => {
  const showCategoryModal = useSelector(
    (state) => state.record.showCategoryModal
  )
  const dispatch = useDispatch()
  const close = () => {
    dispatch(recordSlice.actions.setShowAddModal(false))
  }
  return (
    <div>
      <Popup
        position="bottom"
        visible={showCategoryModal}
        style={{ height: '100%' }}>
        <div onClick={close}>Close</div>
      </Popup>
    </div>
  )
}
