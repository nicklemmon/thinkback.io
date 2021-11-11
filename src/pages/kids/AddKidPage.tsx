import { useMachine } from '@xstate/react'
import { ChangeEvent } from 'react'
import { Form, Page, Toast } from 'src/components'
import { Button, FormControl, FormLabel, Input, Link, VStack } from 'src/components/chakra'
import { addKidPageMachine } from 'src/machines'

export function AddKidPage() {
  const [state, send] = useMachine(addKidPageMachine)

  function handleSubmit() {
    return send({ type: 'SUBMIT' })
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    return send({ type: 'NAME_CHANGE', name: e.target.value })
  }

  return (
    <Page>
      <Page.Title>Add a Kid</Page.Title>

      <Link to="/kids">Back to Kids</Link>

      {state.matches('success') && <Toast message="New kid successfully added" variant="success" />}

      {state.matches('error') && <p role="alert">Failed to add kid, try again.</p>}

      <Form onSubmit={handleSubmit}>
        <VStack align="flex-start">
          <FormControl id="first-name">
            <FormLabel>First Name</FormLabel>

            <Input
              type="text"
              name="name"
              onChange={handleNameChange}
              value={state.context.kid.name}
              isDisabled={state.matches('loading')}
            />
          </FormControl>

          <Button colorScheme="blue" type="submit" isLoading={state.matches('loading')}>
            Add Kid
          </Button>
        </VStack>
      </Form>
    </Page>
  )
}
