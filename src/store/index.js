
import { configureStore } from '@reduxjs/toolkit'
import { recordSlice } from './slices/recordSlice'
import { statusSlice } from './slices/statusSlice'

export const rootReducer = {
  record: recordSlice.reducer,
  status: statusSlice.reducer
}

export const store = configureStore({
  reducer: rootReducer
})
