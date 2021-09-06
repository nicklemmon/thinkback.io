import { useParams } from 'react-router-dom'
import { Page } from 'src/components'

type KidDetailPageParams = {
  id?: string
}

export function KidDetailsPage() {
  // TODO: Move this to the state machine
  const { id } = useParams<KidDetailPageParams>()

  return (
    <Page>
      {/* TODO: Put the first name of the kid here */}
      <Page.Title>Kid Detail Page</Page.Title>
    </Page>
  )
}
