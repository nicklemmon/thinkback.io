import Parse from 'parse'

const PARSE_APPLICATION_ID = process.env.REACT_APP_APPLICATION_ID || ''
const PARSE_HOST_URL = process.env.REACT_APP_API_BASE_URL || ''
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_API_KEY

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY)
Parse.serverURL = PARSE_HOST_URL

export function App() {
  return (
    <>
      <header>Memories App V2</header>

      <main></main>

      <footer></footer>
    </>
  )
}
