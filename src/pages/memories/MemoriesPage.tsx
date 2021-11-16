import { useMachine } from '@xstate/react'
import { Page } from 'src/components'
import { Button, Link, Spinner } from 'src/components/chakra'
import { memoriesPageMachine } from 'src/machines'

export function MemoriesPage() {
  const [state, send] = useMachine(memoriesPageMachine)

  return (
    <Page>
      <Page.Header>
        <Page.Title>Memories</Page.Title>

        <Button colorScheme="blue" as={Link} to="/memories/add">
          Add a Memory
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
            {state.context.memories.map(memory => {
              return (
                <li key={memory.objectId}>
                  <Link to={`/memories/${memory.objectId}`}>{memory.title}</Link>
                </li>
              )
            })}
          </ul>
        ) : null}
      </Page.Content>
    </Page>
  )
}
