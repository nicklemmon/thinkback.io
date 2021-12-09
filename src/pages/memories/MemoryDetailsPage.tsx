import React from 'react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { ApiAlert, ButtonWrapper, Form, MultiSelect, Page } from 'src/components'
import {
  Button,
  Link,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Select,
  Textarea,
  VStack,
} from 'src/components/chakra'
import { formatInputDate } from 'src/helpers/date'
import { getKidById } from 'src/helpers/kid'
import { Tag } from 'src/types'
import { useMemoryDetailsPageMachine } from 'src/hooks'
import { TAG_OPTIONS } from 'src/constants'
import { MemoryDetailsPageMachineContext } from 'src/machines'

export function MemoryDetailsPage() {
  const [state, send] = useMemoryDetailsPageMachine()
  const context = state.context as MemoryDetailsPageMachineContext
  // This casting shouldn't be necessary - but was intermittently encountering an error otherwise
  const { memory } = context
  const memoryTitle = memory?.get('title')

  function handleSubmit(e: React.SyntheticEvent) {
    const target = e.target as typeof e.target & {
      title: { value: string }
      summary: { value: string }
      kid: { value: string }
      recordedDate: { value: Date }
      tags: { value: string }
    }

    const title = target.title.value
    const summary = target.summary.value
    const kidId = target.kid.value
    const kid = context.kids ? getKidById(context?.kids, kidId) : undefined
    const recordedDate = new Date(target.recordedDate.value)
    const tags = target.tags.value ? target.tags.value.split(',') : []
    const formattedTags = tags.map(tag => {
      return {
        name: tag,
      }
    })

    const updatedMemory = {
      ...memory,
      kid,
      title,
      summary,
      recordedDate,
      tags: formattedTags,
    }

    // TODO: I don't know why this isn't working - xstate and TS don't seem to play nicely together
    /* @ts-ignore */
    return send({ type: 'SUBMIT', memory: updatedMemory })
  }

  const hasForm =
    (state.matches('loaded') ||
      state.matches('submitting') ||
      state.matches('confirmingDeletion') ||
      state.matches('resetting')) &&
    memory
  const isDisabled = state.matches('submitting')

  return (
    <Page>
      <Page.Header>
        <Page.Title>Memory Details</Page.Title>

        <HStack>
          <Button as={Link} level="tertiary" to="/memories" leftIcon={<ArrowBackIcon />}>
            Back to Memories
          </Button>

          <Button
            level="destructive"
            onClick={() => send({ type: 'DELETE', id: memory?.id })}
            isDisabled={state.matches('loading')}
          >
            Delete Memory
          </Button>
        </HStack>
      </Page.Header>

      <Page.Content>
        {state.matches('loading') ? <Page.Loader /> : null}

        {state.matches('notFound') ? <p>Kid not found.</p> : null}

        {state.matches('error') ? (
          <ApiAlert title="Memory failed to load" onRetry={() => send({ type: 'RETRY' })} />
        ) : null}

        {state.matches('confirmingDeletion') || state.matches('deleting') ? (
          <Modal isOpen onClose={() => send('CANCEL_DELETION')}>
            <ModalHeader>Delete Memory</ModalHeader>

            <ModalBody>
              <p>
                Are you sure you want to delete <strong>{memoryTitle}</strong>?
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
          <Form onSubmit={handleSubmit} shouldReset={state.matches('resetting')}>
            <VStack>
              <FormControl id="title" isDisabled={isDisabled}>
                <FormLabel>Title</FormLabel>

                <Input name="title" type="text" defaultValue={memory.get('title')} />
              </FormControl>

              <FormControl id="kid" isDisabled={isDisabled}>
                <FormLabel>Kid</FormLabel>

                <Select name="kid" defaultValue={memory.get('kid')?.id}>
                  {context.kids?.map(kid => {
                    return (
                      <option key={kid.id} value={kid.id}>
                        {kid.get('name')}
                      </option>
                    )
                  })}
                </Select>
              </FormControl>

              <FormControl id="summary" isDisabled={isDisabled}>
                <FormLabel>Summary</FormLabel>

                <Textarea name="summary" defaultValue={memory.get('summary')} />
              </FormControl>

              <FormControl id="recorded-date" isDisabled={isDisabled}>
                <FormLabel>Memory Date</FormLabel>

                <Input
                  type="date"
                  name="recordedDate"
                  defaultValue={formatInputDate(
                    new Date(memory.get('recordedDate') as unknown as Date),
                  )}
                  max={formatInputDate(new Date())}
                  isRequired
                />
              </FormControl>

              <FormControl isDisabled={isDisabled}>
                <MultiSelect
                  label="Tags"
                  id="tags"
                  name="tags"
                  options={TAG_OPTIONS}
                  defaultValue={memory.get('tags')}
                  itemToString={(option: Tag) => option.name}
                />
              </FormControl>

              <ButtonWrapper>
                <Button
                  level="primary"
                  type="submit"
                  isDisabled={isDisabled}
                  isLoading={state.matches('submitting')}
                >
                  Save
                </Button>

                <Button
                  level="secondary"
                  variant="outline"
                  isDisabled={isDisabled}
                  onClick={() => send('CANCEL')}
                >
                  Cancel
                </Button>
              </ButtonWrapper>
            </VStack>
          </Form>
        ) : null}
      </Page.Content>
    </Page>
  )
}
