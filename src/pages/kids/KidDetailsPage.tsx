import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { ApiAlert, Page } from 'src/components'
import { formatDate } from 'src/helpers/date'
import {
  Button,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
} from 'src/components/chakra'
import { useKidDetailsPageMachine } from 'src/hooks'

export function KidDetailsPage() {
  const [state, send] = useKidDetailsPageMachine()
  const { kid } = state.context
  const hasForm =
    kid &&
    (state.matches('loaded') || state.matches('confirmingDeletion') || state.matches('deleting'))

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
            isDisabled={state.matches('loading')}
            onClick={() => send({ type: 'DELETE', id: kid?.id })}
          >
            Delete Kid
          </Button>
        </HStack>
      </Page.Header>

      <Page.Content>
        {state.matches('loading') ? <Page.Loader /> : null}

        {state.matches('notFound') ? <p>Kid not found.</p> : null}

        {state.matches('error') ? (
          <ApiAlert title="Kid failed to load" onRetry={() => send({ type: 'RETRY' })} />
        ) : null}

        {(state.matches('confirmingDeletion') || state.matches('deleting')) && kid ? (
          <Modal isOpen onClose={() => send('CANCEL_DELETION')}>
            <ModalHeader>Delete Kid</ModalHeader>

            <ModalBody>
              <p>
                Are you sure you want to delete <strong>{kid.get('name')}</strong>?
              </p>
            </ModalBody>

            <ModalFooter>
              <HStack>
                <Button
                  level="primary"
                  onClick={() => send({ type: 'CONFIRM_DELETION' })}
                  isLoading={state.matches('deleting')}
                >
                  Delete
                </Button>

                <Button
                  level="secondary"
                  onClick={() => send({ type: 'CANCEL_DELETION' })}
                  isDisabled={state.matches('deleting')}
                >
                  Cancel
                </Button>
              </HStack>
            </ModalFooter>
          </Modal>
        ) : null}

        {hasForm ? (
          <VStack>
            <Stat>
              <StatLabel>Name</StatLabel>

              <StatNumber>{kid.get('name')}</StatNumber>
            </Stat>

            {kid.get('tagColor') ? (
              <Stat>
                <StatLabel>Tag Color</StatLabel>

                <StatNumber>{kid.get('tagColor')}</StatNumber>
              </Stat>
            ) : null}

            {kid.get('createdAt') ? (
              <Stat>
                <StatLabel>Created Date</StatLabel>

                <StatNumber>
                  {formatDate(new Date(kid.get('createdAt') as unknown as Date))}
                </StatNumber>
              </Stat>
            ) : null}

            <Button
              as={Link}
              level="secondary"
              rightIcon={<ArrowForwardIcon />}
              to={`/memories/view/grid?kidId=${kid.id}`}
            >
              See memories for {kid.get('name')}
            </Button>
          </VStack>
        ) : null}
      </Page.Content>
    </Page>
  )
}
