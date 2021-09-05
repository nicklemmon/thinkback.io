import { Link } from 'react-router-dom'
import { Page } from 'src/components'

export function KidsPage() {
  return (
    <Page>
      <Page.Title>Kids</Page.Title>

      <Link to="/kids/add">Add a Kid</Link>
    </Page>
  )
}
