import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRouter from './components/app-router'
import { store } from '@/app/store'
import { Provider } from 'react-redux'
import { Toaster } from '@/components/ui/toaster'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
      <Toaster />
    </Provider>
  </React.StrictMode>,
)
