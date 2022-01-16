import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { DetailScreen } from '../screens/detail/index'

export const AuthenticatedApp = () => {
  return (
    <div>
      <Routes>
        <Route path={'/detail'} element={<DetailScreen />} />
        {/* For any invalid url, redirect to the detail screen. It can only be placed last */}
        <Route path={'*'} element={<Navigate to={'detail'} replace />} />
      </Routes>
    </div>
  )
}
