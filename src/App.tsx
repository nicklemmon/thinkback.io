import { Routes, Route, Navigate } from 'react-router-dom'
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
import { RequireAuthenticated, RequireUnauthenticated } from 'src/components'
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
  const authenticated = state.matches('authenticated')

  return (
    <DefaultLayout authenticated={authenticated} onLogOut={() => send({ type: 'LOG_OUT' })}>
      <Routes>
        <Route path="/" element={<Navigate to="/memories" />} />

        <Route path="/memories" element={<Navigate to="/memories/view/grid" />} />

        <Route
          path="/auth"
          element={
            <RequireUnauthenticated authenticated={authenticated}>
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
            </RequireUnauthenticated>
          }
        />

        <Route
          path="/sign-up"
          element={
            <RequireUnauthenticated authenticated={authenticated}>
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
                isSigningUp={state.matches('signingUp')}
              />
            </RequireUnauthenticated>
          }
        />

        <Route
          path="/kids"
          element={
            <RequireAuthenticated authenticated={authenticated}>
              <KidsPage />
            </RequireAuthenticated>
          }
        ></Route>

        <Route
          path="/kids/add"
          element={
            <RequireAuthenticated authenticated={authenticated}>
              <AddKidPage />
            </RequireAuthenticated>
          }
        ></Route>

        <Route
          path="/kids/:id"
          element={
            <RequireAuthenticated authenticated={authenticated}>
              <KidDetailsPage />
            </RequireAuthenticated>
          }
        />

        <Route
          path="/memories/view/:view"
          element={
            <RequireAuthenticated authenticated={authenticated}>
              <MemoriesPage />
            </RequireAuthenticated>
          }
        />

        <Route
          path="/memories/add"
          element={
            <RequireAuthenticated authenticated={authenticated}>
              <AddMemoryPage />
            </RequireAuthenticated>
          }
        />

        <Route
          path="/memories/:id"
          element={
            <RequireAuthenticated authenticated={authenticated}>
              <MemoryDetailsPage />
            </RequireAuthenticated>
          }
        />

        <Route
          path="/profile"
          element={
            <RequireAuthenticated authenticated={authenticated}>
              <ProfilePage />
            </RequireAuthenticated>
          }
        />

        {!isProd ? <Route path="/throw-error" element={<ThrowErrorPage />} /> : null}

        <Route path="/404" element={<NotFoundPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </DefaultLayout>
  )
}
