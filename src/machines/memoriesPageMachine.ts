import { createMachine, assign } from 'xstate'
import { Memory } from 'src/types'
import { getMemories, getKids } from 'src/helpers/api'

type MemoriesPageMachineContext = {
  memories: Parse.Object<Memory>[] | []
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
          src: () => {
            // kids data isn't being used directly, but pointers within memories are
            return Promise.all([getMemories(), getKids()])
          },
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
        const [memories] = event.data
        const sortedMemories = [...memories].sort(
          (a: Parse.Object<Memory>, b: Parse.Object<Memory>) => {
            /* @ts-expect-error */
            return new Date(b.get('recordedDate')) - new Date(a.get('recordedDate'))
          },
        )
        return { memories: sortedMemories }
      }),
      setErrorToCtx: assign((_ctx, event) => {
        return { error: event }
      }),
    },
  },
)

export { memoriesPageMachine }
