import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { DetailScreen } from 'screens/detail/index'
import { ChartScreen } from 'screens/chart/index'
import { RankScreen } from 'screens/rank/index'
import { SettingScreen } from 'screens/setting/index'
import { Footer } from 'components/footer/index'
import { tabs } from 'config/tabs'
import { RecordCategoryScreen } from 'screens/record-category'

export const AuthenticatedApp = () => {
  // Route path
  return (
    <div>
      <Routes>
        <Route path={'/detail'} element={<DetailScreen />} />
        <Route path={'/chart'} element={<ChartScreen />} />
        <Route path={'/rank'} element={<RankScreen />} />
        <Route path={'/setting'} element={<SettingScreen />} />
        {/* For any invalid url, redirect to the detail screen. It can only be placed last */}
        <Route path={'*'} element={<Navigate to={'detail'} replace />} />
      </Routes>
      <Footer tabs={tabs} />
      <RecordCategoryScreen />
    </div>
  )
}
