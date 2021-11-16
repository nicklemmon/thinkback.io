import React from 'react'
import { Form, Page } from 'src/components'
import { Link } from 'src/components/chakra'

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
        <Page.Title>Login Page</Page.Title>
      </Page.Header>

      <Page.Content>
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" autoComplete="username" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" autoComplete="current-password" />
          </div>

          <input type="submit" value="Log In" />
        </Form>

        <p>
          First time? <Link to="/sign-up">Sign Up</Link>
        </p>
      </Page.Content>
    </Page>
  )
}
