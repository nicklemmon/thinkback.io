import { createMachine, assign } from 'xstate'
import { Kid } from 'src/types'
import { deleteKid, getKid } from 'src/helpers/api'
import { BrowserHistory } from 'history'

type KidDetailsPageMachineContext = {
  kid: Kid | undefined
  error: Object | undefined
}

type KidDetailsPageEvents =
  | { type: 'RETRY' }
  | { type: 'CONFIRM_DELETION' }
  | { type: 'CANCEL_DELETION' }
  | { type: 'DELETE'; id: string | undefined }

type KidDetailsPageParams = {
  id?: string
}

const kidDetailsPageMachine = (queryStringParams: KidDetailsPageParams, history: BrowserHistory) =>
  createMachine<KidDetailsPageMachineContext, KidDetailsPageEvents>(
    {
      id: 'kidDetailsPage',
      initial: 'validatingParams',
      context: {
        kid: {
          objectId: queryStringParams.id,
          name: '',
        },
        error: undefined,
      },
      states: {
        validatingParams: {
          always: [
            {
              target: 'loading',
              cond: (ctx: KidDetailsPageMachineContext) => Boolean(ctx.kid?.objectId),
            },
            {
              target: 'notFound',
            },
          ],
        },
        loading: {
          invoke: {
            src: (ctx: KidDetailsPageMachineContext) => {
              return getKid(ctx.kid?.objectId ? ctx.kid.objectId : '')
            },
            onDone: {
              target: 'loaded',
              actions: 'setKidToCtx',
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
            src: (ctx: KidDetailsPageMachineContext) =>
              deleteKid(ctx.kid?.objectId ? ctx.kid.objectId : ''),
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
          entry: ['redirectToKidsPage'],
          type: 'final',
        },
      },
    },
    {
      actions: {
        setKidToCtx: assign((_ctx, event: any) => {
          return { kid: event.data }
        }),
        setErrorToCtx: assign((_ctx, event) => {
          return { error: event }
        }),
        redirectToKidsPage: () => history.push('/kids'),
      },
    },
  )

export { kidDetailsPageMachine }
