import { createMachine, assign, ActionObject } from 'xstate'
import { uuid } from 'src/helpers/string'
import { ClearToastEvent, ShowToastEvent, ToastMachineContext, ToastMachineEvents } from './types'

const TOAST_AUTO_REMOVAL_DELAY: number = 7500

const addToastToCtx: ActionObject<ToastMachineContext, ShowToastEvent> = assign(
  (ctx, event: ShowToastEvent) => {
    return {
      toasts: [
        ...ctx.toasts,
        {
          id: uuid(),
          message: event.message,
          variant: event.variant,
        },
      ],
    }
  },
)

const clearToastFromCtx: ActionObject<ToastMachineContext, ClearToastEvent> = assign(
  (ctx, event: any) => {
    const nextToasts = ctx.toasts.filter(toast => toast.id !== event.id)

    return {
      toasts: nextToasts,
    }
  },
)

const clearFirstToastFromCtx: ActionObject<ToastMachineContext, ToastMachineEvents> = assign(
  ctx => {
    const nextToasts = ctx.toasts.filter((_toast, index) => index !== 0)

    return {
      toasts: nextToasts,
    }
  },
)

const toastMachine = createMachine<ToastMachineContext, ToastMachineEvents>(
  {
    id: 'toast',
    initial: 'empty',
    context: {
      toasts: [],
    },
    states: {
      empty: {
        on: {
          ADD_TO_QUEUE: {
            actions: addToastToCtx,
            target: 'showing',
          },
        },
      },
      showing: {
        after: [
          {
            delay: TOAST_AUTO_REMOVAL_DELAY,
            cond: 'hasToasts',
            target: 'removingStale',
          },
          {
            delay: TOAST_AUTO_REMOVAL_DELAY,
            target: 'empty',
          },
        ],
        on: {
          ADD_TO_QUEUE: {
            actions: addToastToCtx,
            target: 'showing',
          },
          // TODO: I'm not sure the order of things is right here
          CLEAR_FROM_QUEUE: [
            {
              actions: clearToastFromCtx,
              cond: 'hasToasts',
              target: 'showing',
            },
            {
              actions: clearToastFromCtx,
              target: 'empty',
            },
          ],
          CLEAR_ALL: {
            actions: assign(_ctx => {
              return {
                toasts: [],
              }
            }),
            target: 'empty',
          },
        },
      },
      removingStale: {
        entry: clearFirstToastFromCtx,
        always: [
          {
            cond: 'hasToasts',
            target: 'showing',
          },
          {
            target: 'empty',
          },
        ],
      },
    },
  },
  {
    guards: {
      hasToasts: (ctx: ToastMachineContext) => Boolean(ctx.toasts.length),
    },
  },
)

export { toastMachine }
