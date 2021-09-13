import { Link } from 'react-router-dom'
import { Page } from 'src/components'
import { useKidDetailsPageMachine } from 'src/hooks'

export function KidDetailsPage() {
  const [state, send] = useKidDetailsPageMachine()
  const kidName = state.context.kid?.name
  console.log('state.value', state.value)

  return (
    <Page>
      <Page.Title>{kidName ? `Kid Details for ${kidName}` : 'Kid Details'}</Page.Title>

      <Link to="/kids">Back to Kids</Link>

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
          Are you sure you want to delete {kidName}?
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

      {state.matches('loaded') && state.context.kid ? (
        <>
          <div>Name: {kidName}</div>

          <div>Created Date: {state.context.kid.createdAt}</div>

          <Link to={`/memories?kid=${state.context.kid.objectId}`}>See memories for {kidName}</Link>

          <button
            type="button"
            onClick={() => send({ type: 'DELETE', id: state.context.kid?.objectId })}
          >
            Delete {kidName}
          </button>
        </>
      ) : null}
    </Page>
  )
}
