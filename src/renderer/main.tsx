import React from 'react'
import { createRoot } from 'react-dom/client'
import { installWebApiIfNeeded } from './api/webPolyfill'
import App from './App'
import './index.css'

// In browser mode (no Electron), install HTTP/WebSocket polyfill for window.api
installWebApiIfNeeded()

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
