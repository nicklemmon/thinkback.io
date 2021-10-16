import { useMachine } from '@xstate/react'
import { Link, Page } from 'src/components'
import { kidsPageMachine } from 'src/machines/kidsPageMachine'

export function KidsPage() {
  const [state, send] = useMachine(kidsPageMachine)

  return (
    <Page>
      <Page.Title>Kids</Page.Title>

      <Link to="/kids/add">Add a Kid</Link>

      <Page.Content>
        {state.matches('loading') && <p>Loading....</p>}

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
                <li key={kid.objectId}>
                  <Link to={`/kids/${kid.objectId}`}>{kid.name}</Link>
                </li>
              )
            })}
          </ul>
        ) : null}
      </Page.Content>
    </Page>
  )
}
