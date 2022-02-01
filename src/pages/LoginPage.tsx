import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Form, Page } from 'src/components'
import { Box, Button, FormControl, FormLabel, Input, Link, VStack } from 'src/components/chakra'

type HandleLoginParams = {
  username: string
  password: string
}

type LoginProps = {
  handleLogin: (params: HandleLoginParams) => void
}

export function LoginPage({ handleLogin }: LoginProps) {
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    console.log(e.target)

    const target = e.target as typeof e.target & {
      username: { value: string }
      password: { value: string }
    }
    const username = target.username.value
    const password = target.password.value

    return handleLogin({ username, password })
  }

  return (
    <Page>
      <Page.Header>
        <Page.Title>Login</Page.Title>
      </Page.Header>

      <Page.Content>
        <Form onSubmit={handleSubmit}>
          <VStack>
            <FormControl id="username">
              <FormLabel htmlFor="username">Username</FormLabel>

              <Input type="text" name="username" autoComplete="username" />
            </FormControl>

            <FormControl id="password">
              <FormLabel htmlFor="password">Password</FormLabel>

              <Input type="password" name="password" autoComplete="current-password" />
            </FormControl>

            <Button level="primary" type="submit">
              Log In
            </Button>
          </VStack>
        </Form>

        <Box marginTop="5">
          <p>
            First time?{' '}
            <Link as={RouterLink} to="/sign-up">
              Sign Up
            </Link>
          </p>
        </Box>
      </Page.Content>
    </Page>
  )
}
