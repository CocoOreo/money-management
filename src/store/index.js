
import { configureStore } from '@reduxjs/toolkit'
import { recordSlice } from './slices/recordSlice'

export const rootReducer = {
  record: recordSlice.reducer
}

export const store = configureStore({
  reducer: rootReducer
})
