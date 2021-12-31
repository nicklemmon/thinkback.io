import { createMachine, assign } from 'xstate'
import { Memory } from 'src/types'
import { getMemories, getKids } from 'src/helpers/api'
import { BrowserHistory } from 'history'

type MemoriesPageMachineContext = {
  view?: string
  memories: Parse.Object<Memory>[] | []
  error: Object | undefined
}

type View = 'grid' | 'table'

type MemoriesPageEvents = { type: 'RETRY' } | { type: 'CHANGE_VIEW'; view: View }

const memoriesPageMachine = (history: BrowserHistory) => {
  return createMachine<MemoriesPageMachineContext, MemoriesPageEvents>(
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
              // kids data isn't being used directly, but pointers within memories are,
              // so we need to request those as well.
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
            CHANGE_VIEW: {
              actions: 'updateView',
              target: 'success',
            },
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
        updateView: (_ctx, event: any) => {
          return history.push(`/memories/view/${event.view}`)
        },
      },
    },
  )
}

export { memoriesPageMachine }
