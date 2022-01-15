import React from 'react'
import './App.css'
import { AuthenticatedApp } from './authenticated-app/authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app/unauthenticated-app'
import { getToken } from './service/auth'

function App () {
  const user = false
  const token = getToken()
  return (
    <div className="App">
      {token ? <AuthenticatedApp user={user} /> : <UnauthenticatedApp />}
    </div>
  )
}

export default App
