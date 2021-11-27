import { createMachine, assign } from 'xstate'
import { Kid } from 'src/types'
import { getKids } from 'src/helpers/api'

type KidsPageMachineContext = {
  kids: Parse.Object<Kid>[] | []
  error: Object | undefined
}

type KidsPageMachineEvents = { type: 'RETRY' }

const kidsPageMachine = createMachine<KidsPageMachineContext, KidsPageMachineEvents>(
  {
    id: 'kidsPage',
    initial: 'loading',
    context: {
      kids: [],
      error: undefined,
    },
    states: {
      loading: {
        invoke: {
          src: getKids,
          onDone: {
            target: 'success',
            actions: 'setKidsToCtx',
          },
          onError: {
            target: 'error',
            actions: 'setErrorToCtx',
          },
        },
      },
      success: {},
      error: {
        on: {
          RETRY: 'loading',
        },
      },
    },
  },
  {
    actions: {
      setKidsToCtx: assign((_ctx, event: any) => {
        return { kids: event.data }
      }),
      setErrorToCtx: assign((_ctx, event) => {
        return { error: event }
      }),
    },
  },
)

export { kidsPageMachine }
