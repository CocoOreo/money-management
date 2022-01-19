import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'react-vant/lib/index.css'
import { ConfigProvider } from 'react-vant'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { store } from 'store/index'

const queryClient = new QueryClient()

const themeVars = {
  '--rv-button-primary-border-color': '#FDDA44',
  '--rv-button-primary-background-color': '#FDDA44',
  '--rv-primary-color': '#FDDA44',
  '--rv-success-color': '#FDDA44',
  '--rv-text-color': '#0B0B09',
  '--rv-background-color': '#F3D953',
  '--rv-background-color-light': 'white',
  '--rv-tabbar-height': '60px',
  '--rv-tabbar-item-active-color': '#FDDA44',
  '--rv-tabbar-item-text-color': '#0B0B09',
  '--rv-cell-text-color': '#0B0B09',
  '--rv-loading-spinner-color': 'black'
}

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider themeVars={themeVars}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Provider store={store}>
             <App />
          </Provider>
        </BrowserRouter>
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
