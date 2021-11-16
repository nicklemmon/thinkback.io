import { ChangeEvent } from 'react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Form, Page, Toast } from 'src/components'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  VStack,
} from 'src/components/chakra'
import { useAddKidPage } from 'src/hooks'

export function AddKidPage() {
  const [state, send] = useAddKidPage()

  function handleSubmit() {
    return send({ type: 'SUBMIT' })
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    return send({ type: 'NAME_CHANGE', name: e.target.value })
  }

  return (
    <Page>
      <Page.Header>
        <Page.Title>Add a Kid</Page.Title>

        <Button
          as={Link}
          colorScheme="blue"
          variant="ghost"
          to="/kids"
          leftIcon={<ArrowBackIcon />}
        >
          Back to Kids
        </Button>
      </Page.Header>

      <Page.Content>
        {state.matches('success') && (
          <Toast message="New kid successfully added" variant="success" />
        )}

        {state.matches('error') && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>A "Name" is required to add a kid</AlertDescription>
          </Alert>
        )}

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
      </Page.Content>
    </Page>
  )
}
