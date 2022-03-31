import React, { useState } from 'react'
import './App.css'
import { AuthenticatedApp } from './authenticated-app/authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app/unauthenticated-app'
import { getToken } from './service/auth'

function App () {
  const user = false
  const [token, setToken] = useState(getToken())
  console.log('get token', getToken())
  return (
    <div className="App">
      {token ? (
        <AuthenticatedApp user={user} />
      ) : (
        <UnauthenticatedApp setToken={setToken} />
      )}
    </div>
  )
}

export default App
