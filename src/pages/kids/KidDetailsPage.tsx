import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Page } from 'src/components'
import { formatDate } from 'src/helpers/date'
import { Button, HStack, Link, Stat, StatLabel, StatNumber, VStack } from 'src/components/chakra'
import { useKidDetailsPageMachine } from 'src/hooks'

export function KidDetailsPage() {
  const [state, send] = useKidDetailsPageMachine()
  const kidName = state.context.kid?.name

  return (
    <Page>
      <Page.Header>
        <Page.Title>Kid Details</Page.Title>

        <HStack>
          <Button as={Link} level="tertiary" to="/kids" leftIcon={<ArrowBackIcon />}>
            Back to Kids
          </Button>

          <Button
            level="destructive"
            isDisabled={state.matches('loading') || state.matches('deleting')}
            onClick={() => send({ type: 'DELETE', id: state.context.kid?.objectId })}
          >
            Delete Kid
          </Button>
        </HStack>
      </Page.Header>

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
          <VStack>
            <Stat>
              <StatLabel>Name</StatLabel>

              <StatNumber>{kidName}</StatNumber>
            </Stat>

            {state.context.kid.createdAt ? (
              <Stat>
                <StatLabel>Created Date</StatLabel>

                <StatNumber>{formatDate(new Date(state.context.kid.createdAt))}</StatNumber>
              </Stat>
            ) : null}

            <Button
              as={Link}
              level="secondary"
              rightIcon={<ArrowForwardIcon />}
              to={`/memories?kid=${state.context.kid.objectId}`}
            >
              See memories for {kidName}
            </Button>
          </VStack>
        ) : null}
      </Page.Content>
    </Page>
  )
}
