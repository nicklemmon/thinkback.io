import React from 'react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Form, Page } from 'src/components'
import { Button, FormControl, FormLabel, Input, Link, Select, VStack } from 'src/components/chakra'
import { useAddKidPage } from 'src/hooks'

const TAG_OPTIONS = ['cyan', 'red', 'blue', 'purple', 'teal', 'yellow', 'gray', 'green', 'black']

export function AddKidPage() {
  const [state, send] = useAddKidPage()

  function handleSubmit(e: React.SyntheticEvent) {
    const target = e.target as typeof e.target & {
      name: { value: string }
      tagColor: { value: string }
    }
    const name = target.name.value
    const tagColor = target.tagColor.value
    console.log(tagColor)

    return send({ type: 'SUBMIT', kid: { name, tagColor } })
  }

  return (
    <Page>
      <Page.Header>
        <Page.Title>Add a Kid</Page.Title>

        <Button as={Link} level="tertiary" to="/kids" leftIcon={<ArrowBackIcon />}>
          Back to Kids
        </Button>
      </Page.Header>

      <Page.Content>
        <Form onSubmit={handleSubmit} shouldReset={state.matches('success')}>
          <VStack align="flex-start">
            <FormControl id="first-name" isDisabled={state.matches('submitting')}>
              <FormLabel>First Name</FormLabel>

              <Input
                type="text"
                name="name"
                isDisabled={state.matches('loading')}
                autoComplete="off"
                isRequired
              />
            </FormControl>

            <FormControl id="tag-color" isDisabled={state.matches('submitting')}>
              <FormLabel>Tag Color</FormLabel>

              <Select name="tagColor" isRequired>
                {TAG_OPTIONS.map((option: string) => {
                  return (
                    <option key={`tag-${option}`} value={option}>
                      {option}
                    </option>
                  )
                })}
              </Select>
            </FormControl>

            <Button level="primary" type="submit" isLoading={state.matches('submitting')}>
              Add Kid
            </Button>
          </VStack>
        </Form>
      </Page.Content>
    </Page>
  )
}
