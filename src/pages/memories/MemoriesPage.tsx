import { useMachine } from '@xstate/react'
import { ApiAlert, Page } from 'src/components'
import { Button, Link } from 'src/components/chakra'
import { memoriesPageMachine } from 'src/machines'
import { MemoriesGrid } from './components'

export function MemoriesPage() {
  const [state, send] = useMachine(memoriesPageMachine)

  return (
    <Page>
      <Page.Header>
        <Page.Title>Memories</Page.Title>

        <Button level="primary" as={Link} to="/memories/add">
          Add a Memory
        </Button>
      </Page.Header>

      <Page.Content>
        {state.matches('loading') ? <Page.Loader /> : null}

        {state.matches('error') ? (
          <ApiAlert title="Memories failed to load" onRetry={() => send('RETRY')} />
        ) : null}

        {state.matches('success') ? <MemoriesGrid memories={state.context.memories} /> : null}
      </Page.Content>
    </Page>
  )
}
