import { createMachine, assign } from 'xstate'
import { Kid, Memory } from 'src/types'
import { deleteMemory, getMemories, getKids } from 'src/helpers/api'
import { BrowserHistory } from 'history'

type MemoriesPageMachineContext = {
  view?: string
  kids: Parse.Object<Kid>[] | []
  memories: Parse.Object<Memory>[] | []
  error: Object | undefined
}

type View = 'grid' | 'table'

type MemoriesPageEvents =
  | { type: 'RETRY' }
  | { type: 'CHANGE_VIEW'; view: View }
  | { type: 'FILTER_SUBMIT'; filterBy: string | undefined; kidId: string | undefined }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'DELETE'; memory: Parse.Object<Memory> }
  | { type: 'CONFIRM_DELETION' }
  | { type: 'CANCEL_DELETION' }

const memoriesPageMachine = (history: BrowserHistory) => {
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
            FILTER_SUBMIT: {
              actions: 'updateFilters',
              target: 'success',
            },
            CLEAR_FILTERS: {
              actions: 'clearFilters',
              target: 'success',
            },
            DELETE: {
              target: 'confirmingDeletion',
            },
          },
        },

        confirmingDeletion: {
          on: {
            CONFIRM_DELETION: 'deleting',
            CANCEL_DELETION: 'success',
          },
        },

        deleting: {
          invoke: {
            src: e => {
              console.log('e', e)
              return deleteMemory()
            },
            onDone: {
              target: 'deleted',
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
        setErrorToCtx: assign((_ctx, event) => {
          return { error: event }
        }),
        updateView: (_ctx, event: any) => {
          return history.push({
            pathname: `/memories/view/${event.view}`,
            search: history.location.search,
          })
        },
        updateFilters: (_ctx, event: any) => {
          const { filterBy, kidId } = event

          return history.replace({
            pathname: history.location.pathname,
            search: `?filterBy=${filterBy}&kidId=${kidId}`,
          })
        },
        clearFilters: _ctx => {
          return history.replace({
            pathname: history.location.pathname,
            search: '',
          })
        },
      },
    },
  )
}

export { memoriesPageMachine }
