import { createMachine, assign } from 'xstate'
import { logIn, logOut, signUp } from 'src/helpers/api'
import { getCurrentUser } from 'src/helpers/user'
import type { Toast as ToastType } from 'src/types'
import type { NavigateFunction } from 'react-router-dom'

type AuthMachineContext = {
  user: Object | undefined
  navigate: NavigateFunction
}

type AuthMachineEvents =
  | { type: 'LOGIN'; username: string; password: string }
  | { type: 'SIGN_UP'; username: string; email: string; password: string }
  | { type: 'LOG_OUT' }

/** Manages app auth state on initial load. Also handles logging in, sighing up, and logging out. Some router dependencies are passed as arguments. */
const authMachine = (navigate: NavigateFunction, showToast: (toast: ToastType) => void) =>
  createMachine<AuthMachineContext, AuthMachineEvents>(
    {
      id: 'auth',
      initial: 'evaluatingSession',
      context: {
        navigate,
        user: undefined,
      },
      states: {
        evaluatingSession: {
          entry: ['assignUserToCtx'],
          always: [
            {
              cond: 'isLoggedIn',
              target: 'authenticated',
            },
            {
              target: 'unauthenticated',
            },
          ],
        },

        unauthenticated: {
          entry: 'navigateToAuthPage',
          on: {
            LOGIN: 'loggingIn',
            SIGN_UP: 'signingUp',
          },
        },

        loggingIn: {
          invoke: {
            // TODO: Boo any
            src: (_context, event: any) => {
              return logIn(event.username, event.password)
            },
            onDone: {
              target: 'authenticated',
              actions: ['navigateToDashboard'],
            },
            onError: {
              target: 'unauthenticated',
              actions: 'handleLoginFailure',
            },
          },
        },

        authenticated: {
          on: {
            LOG_OUT: 'loggingOut',
          },
        },

        loggingOut: {
          invoke: {
            src: logOut,
            onDone: {
              target: 'unauthenticated',
              actions: 'assignUserToCtx',
            },
            onError: {
              target: 'authenticated',
              actions: 'handleLogOutFailure',
            },
          },
        },

        signUp: {
          entry: 'navigateToSignUp',
        },

        signingUp: {
          invoke: {
            // TODO: Boo any
            src: (_context, event: any) => signUp(event.username, event.email, event.password),
            onDone: {
              target: 'authenticated',
              actions: 'assignUserToCtx',
            },
            onError: {
              target: 'unauthenticated',
              actions: 'handleSignUpFailure',
            },
          },
        },
      },
    },
    {
      actions: {
        navigateToAuthPage: _ctx => {
          return navigate('/auth')
        },

        navigateToDashboard: _ctx => {
          return navigate('/memories')
        },

        navigateToSignUp: _ctx => {
          return navigate('/sign-up')
        },

        assignUserToCtx: assign((_ctx: AuthMachineContext) => {
          const user = getCurrentUser()

          return { user }
        }),

        // TODO: pass error message to the toast
        handleLoginFailure: (a, b) => {
          return showToast({ message: 'Login failed', variant: 'error' })
        },

        handleLogOutFailure: () => {
          return showToast({ message: 'Log out failed. Please try again.', variant: 'error' })
        },

        // TODO: pass error message to the toast
        handleSignUpFailure: () => {
          return showToast({ message: 'Sign up failed.', variant: 'error' })
        },
      },
      guards: {
        isLoggedIn: (ctx): boolean => Boolean(ctx.user),
      },
    },
  )

export { authMachine }
