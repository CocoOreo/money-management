import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showCategoryModal: false
}

export const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    setShowAddModal: (state, action) => {
      state.showCategoryModal = action.payload
    }
  }
})
