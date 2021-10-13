import { createMachine, assign } from 'xstate'
import { Memory } from 'src/types'
import { deleteMemory, getMemory } from 'src/helpers/api'
import { BrowserHistory } from 'history'

type MemoryDetailsPageMachineContext = {
  memory: Memory | undefined
  error: Object | undefined
}

type MemoryDetailsPageEvents =
  | { type: 'RETRY' }
  | { type: 'CONFIRM_DELETION' }
  | { type: 'CANCEL_DELETION' }
  | { type: 'DELETE'; id: string | undefined }

type MemoryDetailsPageParams = {
  id?: string
}

const memoryDetailsPageMachine = (
  queryStringParams: MemoryDetailsPageParams,
  history: BrowserHistory,
) =>
  createMachine<MemoryDetailsPageMachineContext, MemoryDetailsPageEvents>(
    {
      id: 'memoryDetailsPage',
      initial: 'validatingParams',
      context: {
        memory: undefined,
        error: undefined,
      },
      states: {
        validatingParams: {
          always: [
            {
              target: 'loading',
              cond: () => Boolean(queryStringParams.id),
            },
            {
              target: 'notFound',
            },
          ],
        },
        loading: {
          invoke: {
            src: () => {
              return getMemory(queryStringParams.id ? queryStringParams.id : '')
            },
            onDone: {
              target: 'loaded',
              actions: 'setMemoryToCtx',
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
        loaded: {
          on: {
            DELETE: {
              target: 'confirmingDeletion',
            },
          },
        },
        confirmingDeletion: {
          on: {
            CONFIRM_DELETION: 'deleting',
            CANCEL_DELETION: 'loaded',
          },
        },
        deleting: {
          invoke: {
            src: () => {
              return deleteMemory(queryStringParams.id ? queryStringParams.id : '')
            },
            onDone: {
              target: 'deleted',
            },
            onError: {
              target: 'error',
            },
          },
        },
        notFound: {
          type: 'final',
        },
        deleted: {
          entry: ['redirectToMemoriesPage'],
          type: 'final',
        },
      },
    },
    {
      actions: {
        setMemoryToCtx: assign((_ctx, event: any) => {
          return { memory: event.data }
        }),
        setErrorToCtx: assign((_ctx, event) => {
          return { error: event }
        }),
        redirectToMemoriesPage: () => history.push('/memories'),
      },
    },
  )

export { memoryDetailsPageMachine }
