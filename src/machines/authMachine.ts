import { createMachine, assign } from 'xstate'
import Parse, { User } from 'parse'
import { logIn, logOut } from 'src/helpers/api'
import { BrowserHistory } from 'history'
import { getCurrentUser } from 'src/helpers/user'

type AuthMachineContext = {
  user: Object | undefined
  history: BrowserHistory
}

type AuthMachineEvents =
  | { type: 'LOGIN'; username: string; password: string }
  | { type: 'SIGN_UP' }
  | { type: 'LOG_OUT' }

const authMachine = (history: BrowserHistory) =>
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
            SIGN_UP: 'signUp',
          },
        },
        loggingIn: {
          invoke: {
            // TODO: Boo any
            src: (_context, event: any) => logIn(event.username, event.password),
            onDone: {
              target: 'authorized',
            },
            onError: {
              target: 'unauthorized',
              actions: 'handleLoginFailure',
            },
          },
        },
        authorized: {
          entry: 'navigateToDashboard',
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
      },
    },
    {
      actions: {
        initializeParse: () => {
          const PARSE_APPLICATION_ID = process.env.REACT_APP_APPLICATION_ID || ''
          const PARSE_HOST_URL = process.env.REACT_APP_API_BASE_URL || ''
          const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_API_KEY

          Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY)
          Parse.serverURL = PARSE_HOST_URL
        },
        navigateToAuthPage: ctx => {
          return ctx.history.push('/auth')
        },
        navigateToDashboard: ctx => {
          return ctx.history.push('/dashboard')
        },
        navigateToSignUp: ctx => {
          return ctx.history.push('/sign-up')
        },
        assignUserToCtx: assign((_ctx: AuthMachineContext) => {
          const user = getCurrentUser()

          return { user }
        }),
        handleLoginFailure: () => {},
        handleLogOutFailure: () => {},
      },
      guards: {
        isLoggedIn: (ctx): boolean => Boolean(ctx.user),
      },
    },
  )

export { authMachine }
