import { createMachine, assign } from 'xstate'
import { Memory } from 'src/types'
import { getMemories } from 'src/helpers/api'

type MemoriesPageMachineContext = {
  memories: Memory[] | []
  error: Object | undefined
}

type MemoriesPageEvents = { type: 'RETRY' }

const memoriesPageMachine = createMachine<MemoriesPageMachineContext, MemoriesPageEvents>(
  {
    id: 'memoriesPage',
    initial: 'loading',
    context: {
      memories: [],
      error: undefined,
    },
    states: {
      loading: {
        invoke: {
          src: getMemories,
          onDone: {
            target: 'success',
            actions: 'setMemoriesToCtx',
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
          // TODO: edit, delete memory events go here
        },
      },
    },
  },
  {
    actions: {
      setMemoriesToCtx: assign((_ctx, event: any) => {
        return { memories: event.data }
      }),
      setErrorToCtx: assign((_ctx, event) => {
        return { error: event }
      }),
    },
  },
)

export { memoriesPageMachine }
