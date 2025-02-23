import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/styles/index.css'

import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  gtmId: 'G-9DL4MQM46S',
}

TagManager.initialize(tagManagerArgs)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
