import { Link as RouterLink } from 'react-router-dom'
import { Redirect, Route, Switch } from 'react-router-dom'
import {
  AddKidPage,
  AddMemoryPage,
  KidDetailsPage,
  KidsPage,
  LoginPage,
  MemoriesPage,
  MemoryDetailsPage,
  NotFoundPage,
  ProfilePage,
  SignUpPage,
  ThrowErrorPage,
} from 'src/pages'
import { isProd } from 'src/constants'
import { Footer, Header, ProtectedRoute } from 'src/components'
import { Box, Button, Link, List, ListItem, HStack, Text } from 'src/components/chakra'
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
    <Box minHeight="100vh">
      <Header>
        <Link
          fontWeight="700"
          textDecor="none"
          color="gray.100"
          as={RouterLink}
          to={authorized ? '/memories' : '/auth'}
        >
          ThinkBack
        </Link>

        {authorized ? (
          <Header.Nav>
            <HStack as={List}>
              <ListItem>
                <Header.Link to="/memories">Memories</Header.Link>
              </ListItem>

              <ListItem>
                <Header.Link to="/kids">Kids</Header.Link>
              </ListItem>

              <ListItem>
                <Header.Link to="/profile">Profile</Header.Link>
              </ListItem>

              <ListItem>
                <Button
                  level="secondary"
                  size="sm"
                  colorScheme="whiteAlpha"
                  color="white"
                  onClick={() => send({ type: 'LOG_OUT' })}
                >
                  Log Out
                </Button>
              </ListItem>
            </HStack>
          </Header.Nav>
        ) : null}
      </Header>

      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/memories" />
          </Route>

          <Route path="/memories" exact>
            <Redirect to="/memories/view/grid" />
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

          <ProtectedRoute condition={authorized} path="/kids" exact>
            <KidsPage />
          </ProtectedRoute>

          <ProtectedRoute condition={authorized} path="/kids/add">
            <AddKidPage />
          </ProtectedRoute>

          <ProtectedRoute condition={authorized} path="/kids/:id">
            <KidDetailsPage />
          </ProtectedRoute>

          <ProtectedRoute condition={authorized} path="/memories/view/:view">
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

          {!isProd ? (
            <Route path="/throw-error">
              <ThrowErrorPage />
            </Route>
          ) : null}

          <Route path="/404">
            <NotFoundPage />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </main>

      <Footer>
        <Text as="p">
          All rights reserved, {/* @ts-expect-error */}
          <Link
            as="a"
            href="https://nicklemmon.com"
            rel="noopener noreferrer"
            target="_blank"
            color="currentColor"
          >
            Nick Lemmon
          </Link>{' '}
          {new Date().getFullYear()}
        </Text>
      </Footer>
    </Box>
  )
}
