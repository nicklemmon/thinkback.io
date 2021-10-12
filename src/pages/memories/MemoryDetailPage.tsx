import { Link } from 'react-router-dom'
import { Form, Page } from 'src/components'

export function MemoryDetailPage() {
  return (
    <Page>
      {/* TODO: Put the memory title or ID up here */}
      <Page.Title>Memory Detail Page</Page.Title>

      <Page.Content>
        <Link to="/memories">Back to Memories</Link>

        <Form onSubmit={() => {}}>
          <p>Hello</p>
        </Form>
      </Page.Content>
    </Page>
  )
}
