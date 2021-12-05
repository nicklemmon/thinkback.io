import React from 'react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Form, MultiSelect, Page } from 'src/components'
import {
  Button,
  Link,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from 'src/components/chakra'
import { useAddMemoryPage } from 'src/hooks'
import { formatInputDate } from 'src/helpers/date'
import { getKidById } from 'src/helpers/kid'
import { Tag } from 'src/types'
import { TAG_OPTIONS } from 'src/constants'
import type { AddMemoryPageMachineContext } from 'src/machines'

export function AddMemoryPage() {
  const [state, send] = useAddMemoryPage()
  const context = state.context as AddMemoryPageMachineContext

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

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

    return send({
      type: 'SUBMIT',
      memory: { title, kid, summary, recordedDate, tags: formattedTags },
    })
  }

  return (
    <Page>
      <Page.Header>
        <Page.Title>Add Memory</Page.Title>

        <Button as={Link} level="tertiary" to="/memories" leftIcon={<ArrowBackIcon />}>
          Back to Memories
        </Button>
      </Page.Header>

      <Page.Content>
        <Form onSubmit={handleSubmit} shouldReset={state.matches('success')}>
          <VStack>
            <FormControl id="title">
              <FormLabel>Title</FormLabel>

              <Input
                type="text"
                name="title"
                isDisabled={state.matches('submitting') || state.matches('success')}
                isRequired
              />
            </FormControl>

            <FormControl id="kid">
              <FormLabel>Kid</FormLabel>

              <Select name="kid">
                {context.kids?.map(kid => {
                  return (
                    <option key={kid.id} value={kid.id}>
                      {kid.get('name')}
                    </option>
                  )
                })}
              </Select>
            </FormControl>

            <FormControl id="summary">
              <FormLabel>Summary</FormLabel>

              <Textarea
                name="summary"
                isDisabled={state.matches('submitting') || state.matches('success')}
              />
            </FormControl>

            <FormControl id="recorded-date">
              <FormLabel>Memory Date</FormLabel>

              <Input
                type="date"
                name="recordedDate"
                defaultValue={formatInputDate(new Date())}
                max={formatInputDate(new Date())}
                isDisabled={state.matches('submitting') || state.matches('success')}
                isRequired
              />
            </FormControl>

            <FormControl>
              <MultiSelect
                label="Tags"
                id="tags"
                name="tags"
                options={TAG_OPTIONS}
                isDisabled={state.matches('submitting') || state.matches('success')}
                itemToString={(option: Tag) => option.name}
              />
            </FormControl>

            <Button level="primary" type="submit" isLoading={state.matches('submitting')}>
              Add Memory
            </Button>
          </VStack>
        </Form>
      </Page.Content>
    </Page>
  )
}
