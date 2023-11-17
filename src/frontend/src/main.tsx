import React from 'react'
import ReactDOM from 'react-dom/client'
import { Response_message } from './components/message_response/msg'
import { Send_msg } from './components/message_send/message'
import Router from './routes/router' 
import Header from './components/Header/header'
import "./global.scss" 



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router/>
  </React.StrictMode>
)
  