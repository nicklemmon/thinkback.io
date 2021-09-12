import { NavLink, Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import {
  AddKidPage,
  AddMemoryPage,
  DashboardPage,
  KidDetailsPage,
  KidsPage,
  LandingPage,
  LoginPage,
  MemoriesPage,
  MemoryDetailPage,
  ProfilePage,
  SignUpPage,
} from 'src/pages'
import { ToastList } from 'src/components'
import { useAuthMachine } from './hooks'
import { Providers } from './Providers'

export function App() {
  const [state, send] = useAuthMachine()

  return (
    <Providers>
      <header>
        <Link to={state.matches('authorized') ? '/dashboard' : '/auth'}>Memories App</Link>

        {state.matches('authorized') ? (
          <nav>
            <ul>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>

              <li>
                <NavLink to="/kids">Kids</NavLink>
              </li>

              <li>
                <NavLink to="/memories">Memories</NavLink>
              </li>

              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
            </ul>

            <button onClick={() => send({ type: 'LOG_OUT' })}>Log Out</button>
          </nav>
        ) : null}
      </header>

      <main>
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>

          <Route path="/auth">
            <LoginPage
              handleLogin={(submitEvent: { username: string; password: string }) =>
                send({
                  type: 'LOGIN',
                  username: submitEvent.username,
                  password: submitEvent.password,
                })
              }
            />
          </Route>

          <Route path="/sign-up">
            <SignUpPage
              handleSignUp={(submitEvent: {
                username: string
                email: string
                password: string
              }) => {
                send({
                  type: 'SIGN_UP',
                  username: submitEvent.username,
                  email: submitEvent.email,
                  password: submitEvent.password,
                })
              }}
            />
          </Route>

          <Route path="/dashboard">
            <DashboardPage />
          </Route>

          <Route path="/kids" exact>
            <KidsPage />
          </Route>

          <Route path="/kids/add">
            <AddKidPage />
          </Route>

          <Route path="/kids/:id">
            <KidDetailsPage />
          </Route>

          <Route path="/memories" exact>
            <MemoriesPage />
          </Route>

          <Route path="/memories/add">
            <AddMemoryPage />
          </Route>

          <Route path="/memories/:id">
            <MemoryDetailPage />
          </Route>

          <Route path="/profile">
            <ProfilePage />
          </Route>
        </Switch>

        <ToastList />
      </main>

      <footer></footer>
    </Providers>
  )
}
