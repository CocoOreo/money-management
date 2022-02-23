import { createSlice } from '@reduxjs/toolkit'
import { getCurrentYearWeek } from 'utils/base'

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
const week = getCurrentYearWeek()
const initialState = {
  year,
  month,
  day,
  week,
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
    },
    setWeek: (state, action) => {
      state.week = action.payload
    },
    setMonth: (state, action) => {
      state.month = action.payload
    },
    setYear: (state, action) => {
      state.year = action.payload
    }
  }
})
