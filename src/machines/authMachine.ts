import { createMachine, assign } from 'xstate'
import { BrowserHistory } from 'history'
import { logIn, logOut, signUp } from 'src/helpers/api'
import { getCurrentUser } from 'src/helpers/user'
import { Toast as ToastType } from 'src/types'

type AuthMachineContext = {
  user: Object | undefined
  history: BrowserHistory
}

type AuthMachineEvents =
  | { type: 'LOGIN'; username: string; password: string }
  | { type: 'SIGN_UP'; username: string; email: string; password: string }
  | { type: 'LOG_OUT' }

/** Manages app auth state on initial load. Also handles logging in, sighing up, and logging out. Some router dependencies are passed as arguments. */
const authMachine = (history: BrowserHistory, showToast: (toast: ToastType) => void) =>
  createMachine<AuthMachineContext, AuthMachineEvents>(
    {
      id: 'auth',
      initial: 'evaluatingSession',
      context: {
        history,
        user: undefined,
      },
      states: {
        evaluatingSession: {
          entry: ['assignUserToCtx'],
          always: [
            {
              cond: 'isLoggedIn',
              target: 'authorized',
            },
            {
              target: 'unauthorized',
            },
          ],
        },
        unauthorized: {
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
              target: 'authorized',
              actions: ['navigateToDashboard'],
            },
            onError: {
              target: 'unauthorized',
              actions: 'handleLoginFailure',
            },
          },
        },
        authorized: {
          on: {
            LOG_OUT: 'loggingOut',
          },
        },
        loggingOut: {
          invoke: {
            src: logOut,
            onDone: {
              target: 'unauthorized',
              actions: 'assignUserToCtx',
            },
            onError: {
              target: 'authorized',
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
              target: 'authorized',
              actions: 'assignUserToCtx',
            },
            onError: {
              target: 'unauthorized',
              actions: 'handleSignUpFailure',
            },
          },
        },
      },
    },
    {
      actions: {
        navigateToAuthPage: _ctx => {
          return history.push('/auth')
        },

        navigateToDashboard: _ctx => {
          return history.push('/memories')
        },

        navigateToSignUp: _ctx => {
          return history.push('/sign-up')
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
