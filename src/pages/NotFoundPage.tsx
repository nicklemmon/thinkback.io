import { Page } from 'src/components'

export function NotFoundPage() {
  return (
    <Page>
      <Page.Header>
        <Page.Title>404 Not Found</Page.Title>
      </Page.Header>

      <Page.Content>
        <p>Sorry, the page you are looking for was not found.</p>
      </Page.Content>
    </Page>
  )
}
