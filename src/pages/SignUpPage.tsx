import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Card, Form, Page } from 'src/components'
import { Box, Button, FormControl, FormLabel, Input, Link, VStack } from 'src/components/chakra'

type HandleSignUpParams = {
  username: string
  email: string
  password: string
}

type SignUpProps = {
  handleSignUp: (params: HandleSignUpParams) => void
  isSigningUp: boolean
}

export function SignUpPage({ handleSignUp, isSigningUp }: SignUpProps) {
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

  console.log('isSigningUp', isSigningUp)

  return (
    <Page>
      <Page.Header>
        <Page.Title>Sign Up</Page.Title>
      </Page.Header>

      <Page.Content breakout>
        <Card>
          <Box padding={6}>
            <Box maxW="3xl">
              <Form onSubmit={handleSubmit}>
                <VStack>
                  <FormControl id="username" isDisabled={isSigningUp}>
                    <FormLabel>Username</FormLabel>

                    <Input type="text" name="username" autoComplete="username" />
                  </FormControl>

                  <FormControl id="email" isDisabled={isSigningUp}>
                    <FormLabel>Email</FormLabel>

                    <Input type="text" name="email" autoComplete="email" />
                  </FormControl>

                  <FormControl id="password" isDisabled={isSigningUp}>
                    <FormLabel>Password</FormLabel>

                    <Input type="password" name="password" autoComplete="current-password" />
                  </FormControl>

                  <Button level="primary" type="submit" isLoading={isSigningUp}>
                    Sign Up
                  </Button>
                </VStack>
              </Form>
            </Box>
          </Box>
        </Card>

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
