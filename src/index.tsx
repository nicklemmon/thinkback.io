import React from 'react'
import Parse from 'parse'
import ReactDOM from 'react-dom'

import { App } from './App'
import reportWebVitals from './reportWebVitals'

const PARSE_APPLICATION_ID = process.env.REACT_APP_APPLICATION_ID || ''
const PARSE_HOST_URL = process.env.REACT_APP_API_BASE_URL || ''
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_API_KEY

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY)
Parse.serverURL = PARSE_HOST_URL

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
