import React from 'react'
import { Link, Page } from 'src/components'

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
      <Page.Title>Sign Up</Page.Title>

      <Page.Content>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" autoComplete="username" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" autoComplete="email" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" autoComplete="current-password" />
          </div>

          <input type="submit" value="Sign Up" />
        </form>

        <p>
          Already signed up? <Link to="/auth">Log in.</Link>
        </p>
      </Page.Content>
    </Page>
  )
}
