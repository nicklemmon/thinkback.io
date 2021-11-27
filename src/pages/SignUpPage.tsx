import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Form, Page } from 'src/components'
import { Box, Button, FormControl, FormLabel, Input, Link, VStack } from 'src/components/chakra'

type HandleSignUpParams = {
  username: string
  email: string
  password: string
}

type SignUpProps = {
  handleSignUp: (params: HandleSignUpParams) => void
}

export function SignUpPage({ handleSignUp }: SignUpProps) {
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      username: { value: string }
      email: { value: string }
      password: { value: string }
    }
    const username = target.username.value
    const email = target.email.value
    const password = target.password.value

    return handleSignUp({ username, email, password })
  }

  return (
    <Page>
      <Page.Header>
        <Page.Title>Sign Up</Page.Title>
      </Page.Header>

      <Page.Content>
        <Form onSubmit={handleSubmit}>
          <VStack>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>

              <Input type="text" name="username" autoComplete="username" />
            </FormControl>

            <FormControl id="email">
              <FormLabel>Email</FormLabel>

              <Input type="text" name="email" autoComplete="email" />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>

              <Input type="password" name="password" autoComplete="current-password" />
            </FormControl>

            <Button level="primary">Sign Up</Button>
          </VStack>
        </Form>

        <Box marginTop="5">
          <p>
            Already signed up?{' '}
            <Link as={RouterLink} to="/auth">
              Log in.
            </Link>
          </p>
        </Box>
      </Page.Content>
    </Page>
  )
}
