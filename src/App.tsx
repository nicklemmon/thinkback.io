import { NavLink } from 'react-router-dom'
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
  MemoryDetailsPage,
  NotFoundPage,
  ProfilePage,
  SignUpPage,
} from 'src/pages'
import { ProtectedRoute, ToastList } from 'src/components'
import { Link } from 'src/components/chakra'
import { useAuthMachine } from './hooks'
import { Providers } from './Providers'

export function App() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  )
}

function AppContent() {
  const [state, send] = useAuthMachine()
  const authorized = state.matches('authorized')

  console.log('state.value', state.value)

  return (
    <>
      <header>
        <Link to={authorized ? '/dashboard' : '/auth'}>Memories App</Link>

        {authorized ? (
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

          <ProtectedRoute condition={!authorized} path="/auth" exact>
            <LoginPage
              handleLogin={(submitEvent: { username: string; password: string }) =>
                send({
                  type: 'LOGIN',
                  username: submitEvent.username,
                  password: submitEvent.password,
                })
              }
            />
          </ProtectedRoute>

          <ProtectedRoute condition={!authorized} path="/sign-up">
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
          </ProtectedRoute>

          <ProtectedRoute condition={authorized} path="/dashboard">
            <DashboardPage />
          </ProtectedRoute>

          <ProtectedRoute condition={authorized} path="/kids" exact>
            <KidsPage />
          </ProtectedRoute>

          <ProtectedRoute condition={authorized} path="/kids/add">
            <AddKidPage />
          </ProtectedRoute>

          <ProtectedRoute condition={authorized} path="/kids/:id">
            <KidDetailsPage />
          </ProtectedRoute>

          <ProtectedRoute condition={authorized} path="/memories" exact>
            <MemoriesPage />
          </ProtectedRoute>

          <ProtectedRoute condition={authorized} path="/memories/add">
            <AddMemoryPage />
          </ProtectedRoute>

          <ProtectedRoute condition={authorized} path="/memories/:id">
            <MemoryDetailsPage />
          </ProtectedRoute>

          <ProtectedRoute condition={authorized} path="/profile">
            <ProfilePage />
          </ProtectedRoute>

          <Route path="/404">
            <NotFoundPage />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>

        <ToastList />
      </main>

      <footer></footer>
    </>
  )
}
