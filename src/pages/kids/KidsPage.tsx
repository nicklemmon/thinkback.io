import { useMachine } from '@xstate/react'
import { Page } from 'src/components'
import { Button, Link, Spinner } from 'src/components/chakra'
import { kidsPageMachine } from 'src/machines/kidsPageMachine'

export function KidsPage() {
  const [state, send] = useMachine(kidsPageMachine)

  return (
    <Page>
      <Page.Header>
        <Page.Title>Kids</Page.Title>

        <Button level="primary" as={Link} to="/kids/add">
          Add a Kid
        </Button>
      </Page.Header>

      <Page.Content>
        {state.matches('loading') && <Spinner />}

        {state.matches('error') && (
          <p>
            Something went wrong. Try again.{' '}
            <button onClick={() => send({ type: 'RETRY' })}>Retry</button>
          </p>
        )}

        {state.matches('success') ? (
          <ul>
            {state.context.kids.map(kid => {
              return (
                <li key={kid.id}>
                  <Link to={`/kids/${kid.id}`}>{kid.get('name')}</Link>
                </li>
              )
            })}
          </ul>
        ) : null}
      </Page.Content>
    </Page>
  )
}
