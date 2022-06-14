import React from 'react'
import Parse from 'parse/dist/parse.js'
import ReactDOM from 'react-dom'
import { ColorModeScript } from '@chakra-ui/react'
import { theme } from './theme'
import { App } from './App'

const PARSE_APPLICATION_ID = import.meta.env.VITE_APPLICATION_ID as string
const PARSE_HOST_URL = import.meta.env.VITE_API_BASE_URL as string
const PARSE_JAVASCRIPT_KEY = import.meta.env.VITE_API_KEY as string

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY)
Parse.serverURL = PARSE_HOST_URL

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
