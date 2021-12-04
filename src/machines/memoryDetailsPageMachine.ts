import { createMachine, assign, MachineConfig } from 'xstate'
import { Kid, Memory, Toast } from 'src/types'
import { deleteMemory, getMemory, updateMemory, getKids } from 'src/helpers/api'
import { BrowserHistory } from 'history'

export type MemoryDetailsPageMachineContext = {
  memory: Parse.Object<Memory> | undefined
  kids: Parse.Object<Kid>[] | [] | undefined
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
    resetting: {}
  }
}

type MemoryDetailsPageMachineEvents =
  | { type: 'RETRY' }
  | { type: 'CANCEL' }
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
      kids: undefined,
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
            return Promise.all([
              getMemory(queryStringParams.id ? queryStringParams.id : ''),
              getKids(),
            ])
          },
          onDone: {
            target: 'loaded',
            actions: 'setDataToCtx',
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
          CANCEL: {
            target: 'resetting',
          },
        },
      },

      resetting: {
        after: {
          1: 'loaded',
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
          src: (_ctx, event: any) => updateMemory(event.memory as Memory),
          onDone: {
            target: 'loaded',
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
        entry: 'handleDeleted',
        type: 'final',
      },
    },
  }

  const machineOptions = {
    actions: {
      setDataToCtx: assign((_ctx, event: any) => {
        const [memoryRes, kidsRes] = event.data

        return { memory: memoryRes, kids: kidsRes }
      }),
      // TODO: Fix this to handle `Promise.all` errors
      setErrorToCtx: assign((_ctx, event: any) => {
        return { error: event }
      }),
      handleSuccess: () => {
        return showToast({ message: 'Memory updated', variant: 'success' })
      },
      handleDeleted: () => {
        showToast({ message: 'Memory deleted', variant: 'success' })

        return history.push('/memories')
      },
      handleError: () => {
        return showToast({ message: 'Memory failed to update. Try again.', variant: 'error' })
      },
    },
  }

  // TODO: Not sure why TypeScript is yelling at me here
  /* @ts-expect-error */
  return createMachine(machineConfig, machineOptions)
}

export { memoryDetailsPageMachine }
