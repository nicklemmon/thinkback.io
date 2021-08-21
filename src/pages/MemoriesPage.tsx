import { Page } from 'src/components'
import { useMachine } from '@xstate/react'
import { memoriesPageMachine } from 'src/machines/memoriesPageMachine'

export function MemoriesPage() {
  const [state, send] = useMachine(memoriesPageMachine)

  return (
    <Page>
      <Page.Title>Memories</Page.Title>

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
              return <li key={memory.objectId}>{memory.title}</li>
            })}
          </ul>
        ) : null}
      </Page.Content>
    </Page>
  )
}
