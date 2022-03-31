
import { configureStore } from '@reduxjs/toolkit'
import { recordSlice } from './slices/recordSlice'
import { statusSlice } from './slices/statusSlice'
import { userSlice } from './slices/userSlick'

export const rootReducer = {
  record: recordSlice.reducer,
  status: statusSlice.reducer,
  user: userSlice.reducer
}

export const store = configureStore({
  reducer: rootReducer
})
