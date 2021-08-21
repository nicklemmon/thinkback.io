import { createMachine, assign } from 'xstate'
import { getUser } from 'src/helpers/api'
import { getCurrentUser } from 'src/helpers/user'
import { User } from 'src/types'

type ProfilePageContext = {
  user: User | undefined
  error: Object | undefined
}

type ProfilePageEvents = { type: 'RETRY' }

const profilePageMachine = createMachine<ProfilePageContext, ProfilePageEvents>(
  {
    id: 'profilePageMachine',
    initial: 'loading',
    context: {
      user: undefined,
      error: undefined,
    },
    states: {
      initializing: {
        entry: 'setUserIdToCtx',
        always: [
          {
            target: 'loading',
          },
        ],
      },
      loading: {
        invoke: {
          src: ctx => {
            const currentUser = getCurrentUser()

            // Passing empty string here will cause an error intentionally
            return getUser(currentUser ? currentUser.id : '')
          },
          onDone: {
            target: 'success',
            actions: 'setUserToCtx',
          },
          onError: {
            target: 'error',
            actions: 'setErrorToCtx',
          },
        },
      },
      error: {
        on: {
          RETRY: 'loading',
        },
      },
      success: {
        on: {
          // TODO: edit username, password events go here
        },
      },
    },
  },
  {
    actions: {
      setUserToCtx: assign((_ctx, event: any) => {
        return { user: event.data }
      }),
      setErrorToCtx: assign((_ctx, event) => {
        return { error: event }
      }),
    },
  },
)

export { profilePageMachine }
