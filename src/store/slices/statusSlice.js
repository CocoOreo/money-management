import { createSlice } from '@reduxjs/toolkit'

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
const initialState = {
  year,
  month,
  day,
  //   type: 0 -> Expense, 1 -> Income
  type: 0,
  //   scope: 0-> week, 1-> month, 2-> year
  scope: 0
}

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setScope: (state, action) => {
      state.scope = action.payload
    },
    setType: (state, action) => {
      state.type = action.payload
    }
  }
})
