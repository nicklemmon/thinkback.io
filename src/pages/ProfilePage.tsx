import { ApiAlert, Page } from 'src/components'
import { useMachine } from '@xstate/react'
import { Stat, StatLabel, StatNumber, VStack } from 'src/components/chakra'
import { profilePageMachine } from 'src/machines'

export function ProfilePage() {
  const [state, send] = useMachine(profilePageMachine)

  return (
    <Page>
      <Page.Header>
        <Page.Title>Profile</Page.Title>
      </Page.Header>

      {state.matches('loading') ? <Page.Loader /> : null}

      <Page.Content>
        {state.matches('error') ? (
          <ApiAlert title="Profile failed to load" onRetry={() => send({ type: 'RETRY' })} />
        ) : null}

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
