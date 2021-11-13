import React from 'react'
import { ButtonWrapper, Form, MultiSelect, Page } from 'src/components'
import {
  Button,
  Link,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from 'src/components/chakra'
import { formatDate } from 'src/helpers/date'
import { Tag } from 'src/types'
import { useMemoryDetailsPageMachine } from 'src/hooks'
import { TAG_OPTIONS } from 'src/constants'
import { MemoryDetailsPageMachineContext } from 'src/machines'

export function MemoryDetailsPage() {
  const [state, send] = useMemoryDetailsPageMachine()
  // This casting shouldn't be necessary - but was intermittently encountering an error otherwise
  const { memory } = state.context as MemoryDetailsPageMachineContext
  const memoryTitle = memory?.title

  function handleSubmit(e: React.SyntheticEvent) {
    const target = e.target as typeof e.target & {
      title: { value: string }
      summary: { value: string }
      recordedDate: { value: Date }
      tags: { value: string }
    }

    const title = target.title.value
    const summary = target.summary.value
    const recordedDate = new Date(target.recordedDate.value)
    const tags = target.tags.value ? target.tags.value.split(',') : []
    const formattedTags = tags.map(tag => {
      return {
        name: tag,
      }
    })
    const updatedMemory = {
      ...memory,
      title,
      summary,
      recordedDate,
      tags: formattedTags,
    }

    // TODO: I don't know why this isn't working - xstate and TS don't seem to play nicely together
    /* @ts-ignore */
    return send({ type: 'SUBMIT', memory: updatedMemory })
  }

  return (
    <Page>
      <Page.Title>Memory Details</Page.Title>

      <Link to="/memories">Back to Memories</Link>

      <Button colorScheme="blue" onClick={() => send({ type: 'DELETE', id: memory?.objectId })}>
        Delete Memory
      </Button>

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

        {(state.matches('loaded') || state.matches('submitting')) && memory ? (
          <Form onSubmit={handleSubmit}>
            <VStack>
              <FormControl id="title">
                <FormLabel>Title</FormLabel>

                <Input type="text" id="title" defaultValue={memory.title} />
              </FormControl>

              <FormControl id="summary">
                <FormLabel>Summary</FormLabel>

                <Textarea name="summary" defaultValue={memory.summary} />
              </FormControl>

              <FormControl id="recorded-date">
                <FormLabel>Memory Date</FormLabel>

                <Input
                  type="date"
                  name="recordedDate"
                  id="recorded-date"
                  defaultValue={formatDate(new Date(memory.recordedDate.iso))}
                  max={formatDate(new Date())}
                  isDisabled={state.matches('loading')}
                  isRequired
                />
              </FormControl>

              <FormControl>
                <MultiSelect
                  label="Tags"
                  id="tags"
                  name="tags"
                  options={TAG_OPTIONS}
                  defaultValue={memory.tags}
                  itemToString={(option: Tag) => option.name}
                />
              </FormControl>

              <ButtonWrapper>
                <Button colorScheme="blue" type="submit">
                  Save
                </Button>

                <Button colorScheme="blue" variant="outline">
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
