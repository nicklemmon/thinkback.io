import { Link } from 'react-router-dom'
import { Form, MultiSelect, Page } from 'src/components'
import { formatDate } from 'src/helpers/date'
import { Tag } from 'src/types'
import { useMemoryDetailsPageMachine } from 'src/hooks'
import { TAG_OPTIONS } from 'src/constants'

export function MemoryDetailsPage() {
  const [state, send] = useMemoryDetailsPageMachine()
  const { memory } = state.context
  const memoryTitle = memory?.title

  return (
    <Page>
      <Page.Title>{memoryTitle ? memoryTitle : 'Memory Details'}</Page.Title>

      <Link to="/memories">Back to Memories</Link>

      <button type="button" onClick={() => send({ type: 'DELETE', id: memory?.objectId })}>
        Delete Memory
      </button>

      <Page.Content>
        {state.matches('loading') || state.matches('deleting') ? <p>Loading...</p> : null}

        {state.matches('notFound') ? <p>Kid not found.</p> : null}

        {state.matches('error') ? (
          <p>
            Something went wrong. Try again.{' '}
            <button type="button" onClick={() => send({ type: 'RETRY' })}>
              Retry
            </button>
          </p>
        ) : null}

        {state.matches('confirmingDeletion') ? (
          <div>
            Are you sure you want to delete {memoryTitle}?
            <div>
              <button type="button" onClick={() => send({ type: 'CONFIRM_DELETION' })}>
                Delete
              </button>

              <button type="button" onClick={() => send({ type: 'CANCEL_DELETION' })}>
                Cancel
              </button>
            </div>
          </div>
        ) : null}

        {state.matches('loaded') && memory ? (
          <Form onSubmit={() => {}}>
            <div>
              <label htmlFor="title">Title</label>

              <input type="text" name="title" id="title" defaultValue={memory.title} />
            </div>

            <div>
              <label htmlFor="summary">Summary</label>

              <textarea name="summary" id="summary" defaultValue={memory.summary} />
            </div>

            <div>
              <label htmlFor="recorded-date">Memory Date</label>

              <input
                type="date"
                name="recordedDate"
                id="recorded-date"
                defaultValue={formatDate(new Date(memory.recordedDate.iso))}
                max={formatDate(new Date())}
                disabled={state.matches('loading')}
                required
              />
            </div>

            <div>
              <MultiSelect
                label="Tags"
                id="tags"
                name="tags"
                options={TAG_OPTIONS}
                defaultValue={memory.tags}
                itemToString={(option: Tag) => option.name}
              />
            </div>

            <div>
              <button type="submit">Save</button>

              <button type="button">Cancel</button>
            </div>
          </Form>
        ) : null}
      </Page.Content>
    </Page>
  )
}
