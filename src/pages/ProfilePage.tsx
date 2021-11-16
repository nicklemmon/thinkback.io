import { Page } from 'src/components'
import { useMachine } from '@xstate/react'
import { Spinner, Stat, StatLabel, StatNumber, VStack } from 'src/components/chakra'
import { profilePageMachine } from 'src/machines'

export function ProfilePage() {
  const [state, send] = useMachine(profilePageMachine)

  return (
    <Page>
      <Page.Header>
        <Page.Title>Profile</Page.Title>
      </Page.Header>

      <Page.Content>
        {state.matches('loading') && <Spinner />}

        {state.matches('error') && (
          <p>
            Something went wrong. Try again.{' '}
            <button onClick={() => send({ type: 'RETRY' })}>Retry</button>
          </p>
        )}

        {state.matches('success') && (
          <VStack>
            <Stat>
              <StatLabel>Username</StatLabel>

              <StatNumber>{state.context.user?.username}</StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Email</StatLabel>

              <StatNumber>{state.context.user?.email}</StatNumber>
            </Stat>
          </VStack>
        )}
      </Page.Content>
    </Page>
  )
}
