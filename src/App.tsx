import { Link as RouterLink, NavLink } from 'react-router-dom'
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
import { Header, HeaderNav, ProtectedRoute } from 'src/components'
import { Button, Link, List, ListItem, HStack } from 'src/components/chakra'
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

  return (
    <>
      <Header>
        <Link
          fontWeight="700"
          textDecor="none"
          as={RouterLink}
          to={authorized ? '/dashboard' : '/auth'}
        >
          Memories App
        </Link>

        {authorized ? (
          <HeaderNav>
            <HStack as={List}>
              <ListItem>
                <HeaderLink to="/dashboard">Dashboard</HeaderLink>
              </ListItem>

              <ListItem>
                <HeaderLink to="/kids">Kids</HeaderLink>
              </ListItem>

              <ListItem>
                <HeaderLink to="/memories">Memories</HeaderLink>
              </ListItem>

              <ListItem>
                <HeaderLink to="/profile">Profile</HeaderLink>
              </ListItem>

              <ListItem>
                <Button level="secondary" size="sm" onClick={() => send({ type: 'LOG_OUT' })}>
                  Log Out
                </Button>
              </ListItem>
            </HStack>
          </HeaderNav>
        ) : null}
      </Header>

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
      </main>

      <footer></footer>
    </>
  )
}

function HeaderLink({ children, to }: { children: React.ReactNode; to: string }) {
  return (
    <Link as={NavLink} to={to} textDecor="none" color="purple.500">
      {children}
    </Link>
  )
}
