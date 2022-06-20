import { createMachine, assign } from 'xstate'
import type { Location, NavigateFunction } from 'react-router-dom'
import type { Kid, Memory } from 'src/types'
import { deleteMemory, getMemories, getKids } from 'src/helpers/api'

type MemoriesPageMachineContext = {
  kids: Parse.Object<Kid>[] | []
  memories: Parse.Object<Memory>[] | []
  view?: string
  memoryToDelete?: Parse.Object<Memory>
  error?: Object
}

type View = 'grid' | 'table'

type MemoriesPageEvents =
  | { type: 'RETRY' }
  | { type: 'CHANGE_VIEW'; view: View }
  | { type: 'FILTER_SUBMIT'; filterBy: string | undefined; kidId: string | undefined }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'DELETE'; memory: Parse.Object<Memory> }
  | { type: 'CONFIRM_DELETION'; memory: Parse.Object<Memory> }
  | { type: 'CANCEL_DELETION' }

const memoriesPageMachine = (navigate: NavigateFunction, location: Location) => {
  return createMachine<MemoriesPageMachineContext, MemoriesPageEvents>(
    {
      id: 'memoriesPage',
      initial: 'loading',
      context: {
        memories: [],
        kids: [],
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
              target: 'idle',
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

        idle: {
          on: {
            CHANGE_VIEW: {
              actions: 'updateView',
              target: 'idle',
            },
            FILTER_SUBMIT: {
              actions: 'updateFilters',
              target: 'idle',
            },
            CLEAR_FILTERS: {
              actions: 'clearFilters',
              target: 'idle',
            },
            DELETE: {
              actions: 'setMemoryToDeleteToCtx',
              target: 'confirmingDeletion',
            },
          },
        },

        confirmingDeletion: {
          on: {
            CONFIRM_DELETION: 'deleting',
            CANCEL_DELETION: 'idle',
          },
        },

        deleting: {
          invoke: {
            src: e => {
              return deleteMemory(e.memoryToDelete?.id ? e.memoryToDelete.id : '')
            },
            onDone: {
              target: 'loading',
            },
            onError: {
              target: 'error',
            },
          },
        },
      },
    },
    {
      actions: {
        setMemoriesToCtx: assign((_ctx, event: any) => {
          const [memories, kids] = event.data

          return { memories, kids }
        }),

        setMemoryToDeleteToCtx: assign((_ctx, event: any) => {
          return { memoryToDelete: event.memory }
        }),

        setErrorToCtx: assign((_ctx, event) => {
          return { error: event }
        }),

        updateView: (_ctx, event: any) => {
          return navigate({
            pathname: `/memories/view/${event.view}`,
            search: location.search,
          })
        },

        updateFilters: (_ctx, event: any) => {
          const { filterBy, kidId } = event

          return navigate(
            {
              pathname: location.pathname,
              search: `?filterBy=${filterBy}&kidId=${kidId}`,
            },
            {
              replace: true,
            },
          )
        },

        clearFilters: _ctx => {
          return navigate(
            {
              pathname: location.pathname,
              search: '',
            },
            { replace: true },
          )
        },
      },
    },
  )
}

export { memoriesPageMachine }
