import React, { useEffect } from 'react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Form, MultiSelect, Page } from 'src/components'
import {
  Button,
  Link,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from 'src/components/chakra'
import { useAddMemoryPage } from 'src/hooks'
import { formatDate } from 'src/helpers/date'
import { Tag } from 'src/types'
import { TAG_OPTIONS } from 'src/constants'

export function AddMemoryPage() {
  const [state, send] = useAddMemoryPage()

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

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

    return send({ type: 'SUBMIT', memory: { title, summary, recordedDate, tags: formattedTags } })
  }

  return (
    <Page>
      <Page.Header>
        <Page.Title>Add Memory</Page.Title>

        <Button
          as={Link}
          colorScheme="blue"
          variant="ghost"
          to="/memories"
          leftIcon={<ArrowBackIcon />}
        >
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
                isDisabled={state.matches('loading') || state.matches('success')}
                isRequired
              />
            </FormControl>

            <FormControl id="summary">
              <FormLabel>Summary</FormLabel>

              <Textarea
                name="summary"
                isDisabled={state.matches('loading') || state.matches('success')}
              />
            </FormControl>

            <FormControl id="recorded-date">
              <FormLabel>Memory Date</FormLabel>

              <Input
                type="date"
                name="recordedDate"
                defaultValue={formatDate(new Date())}
                max={formatDate(new Date())}
                isDisabled={state.matches('loading') || state.matches('success')}
                isRequired
              />
            </FormControl>

            <FormControl>
              <MultiSelect
                label="Tags"
                id="tags"
                name="tags"
                options={TAG_OPTIONS}
                disabled={state.matches('loading') || state.matches('success')}
                itemToString={(option: Tag) => option.name}
              />
            </FormControl>

            <Button colorScheme="blue" type="submit" isLoading={state.matches('loading')}>
              Add Memory
            </Button>
          </VStack>
        </Form>
      </Page.Content>
    </Page>
  )
}
