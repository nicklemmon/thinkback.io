import { useMachine } from '@xstate/react'
import { Page } from 'src/components'
import {
  Button,
  Link,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from 'src/components/chakra'
import { memoriesPageMachine } from 'src/machines'

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
        {state.matches('loading') && <Spinner />}

        {state.matches('error') && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Memories failed to load</AlertTitle>
            <AlertDescription>
              Please <button onClick={() => send('RETRY')}>try again</button>.
            </AlertDescription>
          </Alert>
        )}

        {state.matches('success') ? (
          <ul>
            {state.context.memories.map(memory => {
              return (
                <li key={memory.id}>
                  <Link to={`/memories/${memory.id}`}>{memory.get('title')}</Link>
                </li>
              )
            })}
          </ul>
        ) : null}
      </Page.Content>
    </Page>
  )
}
