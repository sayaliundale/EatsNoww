import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from "./ReduxStore/Store.js"
import { Provider } from 'react-redux'
import socket from './utils/Socket.js'

socket.connect();
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </StrictMode>,
)
