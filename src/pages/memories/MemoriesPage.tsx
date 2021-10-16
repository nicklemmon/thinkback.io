import { useMachine } from '@xstate/react'
import { Link, Page } from 'src/components'
import { memoriesPageMachine } from 'src/machines'

export function MemoriesPage() {
  const [state, send] = useMachine(memoriesPageMachine)

  return (
    <Page>
      <Page.Title>Memories</Page.Title>

      <Link to="/memories/add">Add a Memory</Link>

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
