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
import { DefaultLayout } from './layouts'
import { ProtectedRoute } from 'src/components'
import { useAuth } from './hooks'
import { Providers } from './Providers'

export function App() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  )
}

function AppContent() {
  const [state, send] = useAuth()
  const authorized = state.matches('authorized')

  return (
    <DefaultLayout isAuthorized={authorized} onLogOut={() => send({ type: 'LOG_OUT' })}>
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
            isLoggingIn={state.matches('loggingIn')}
          />
        </ProtectedRoute>

        <ProtectedRoute condition={!authorized} path="/sign-up">
          <SignUpPage
            handleSignUp={(submitEvent: { username: string; email: string; password: string }) => {
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
    </DefaultLayout>
  )
}
