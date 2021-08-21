import { Page } from 'src/components'
import { useMachine } from '@xstate/react'
import { profilePageMachine } from 'src/machines'

export function ProfilePage() {
  const [state, send] = useMachine(profilePageMachine)

  console.log('state', state)

  return (
    <Page>
      <Page.Title>Profile</Page.Title>

      <Page.Content>
        {state.matches('loading') && <p>Loading....</p>}

        {state.matches('error') && (
          <p>
            Something went wrong. Try again.{' '}
            <button onClick={() => send({ type: 'RETRY' })}>Retry</button>
          </p>
        )}

        {state.matches('success') && (
          <>
            <p>Username: {state.context.user?.username}</p>

            <p>Email: {state.context.user?.email}</p>
          </>
        )}
      </Page.Content>
    </Page>
  )
}
