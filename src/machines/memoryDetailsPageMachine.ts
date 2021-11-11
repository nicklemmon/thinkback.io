import { createMachine, assign, MachineConfig } from 'xstate'
import { Memory, Toast } from 'src/types'
import { deleteMemory, getMemory, updateMemory } from 'src/helpers/api'
import { BrowserHistory } from 'history'

export type MemoryDetailsPageMachineContext = {
  memory: Memory | undefined
  error: Object | undefined
}

type MemoryDetailsPageMachineSchema = {
  states: {
    validatingParams: {}
    loading: {}
    error: {}
    loaded: {}
    confirmingDeletion: {}
    deleting: {}
    submitting: {}
    notFound: {}
    deleted: {}
  }
}

type MemoryDetailsPageMachineEvents =
  | { type: 'RETRY' }
  | { type: 'CONFIRM_DELETION' }
  | { type: 'CANCEL_DELETION' }
  | { type: 'DELETE'; id: string | undefined }
  | { type: 'SUBMIT'; memory: Memory }

type MemoryDetailsPageParams = {
  id?: string
}

const memoryDetailsPageMachine = (
  queryStringParams: MemoryDetailsPageParams,
  history: BrowserHistory,
  showToast: (toast: Toast) => void,
) => {
  const machineConfig: MachineConfig<
    MemoryDetailsPageMachineContext,
    MemoryDetailsPageMachineSchema,
    MemoryDetailsPageMachineEvents
  > = {
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
          SUBMIT: {
            target: 'submitting',
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

      submitting: {
        invoke: {
          src: (_ctx, event: any) => {
            return updateMemory(event.memory)
          },
          onDone: {
            target: 'loading',
            actions: 'handleSuccess',
          },
          onError: {
            target: 'error',
            actions: 'handleError',
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
  }

  const machineOptions = {
    actions: {
      setMemoryToCtx: assign((_ctx, event: any) => {
        return { memory: event.data }
      }),
      setErrorToCtx: assign((_ctx, event: any) => {
        return { error: event }
      }),
      handleSuccess: () => {
        return showToast({ message: 'Memory updated', variant: 'success' })
      },
      handleError: () => {
        return showToast({ message: 'Memory failed to update. Try again.', variant: 'error' })
      },
      redirectToMemoriesPage: () => history.push('/memories'),
    },
  }

  return createMachine(machineConfig, machineOptions)
}

export { memoryDetailsPageMachine }
