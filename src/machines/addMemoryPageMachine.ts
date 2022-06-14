import { assign, createMachine, MachineConfig } from 'xstate'
import { Kid, NewMemory, Toast } from 'src/types'
import { createMemory, getKids } from 'src/helpers/api'

export type AddMemoryPageMachineContext = {
  kids: Parse.Object<Kid>[] | [] | undefined
  memory: NewMemory
}

type AddMemoryPageMachineSchema = {
  states: {
    editing: {}
    success: {}
    error: {}
    loading: {}
    submitting: {}
  }
}

type AddKidPageMachineEvents = { type: 'SUBMIT'; memory: NewMemory } | { type: 'RETRY' }

function addMemoryPageMachine(showToast: (toast: Toast) => void) {
  const machineConfig: MachineConfig<
    AddMemoryPageMachineContext,
    AddMemoryPageMachineSchema,
    AddKidPageMachineEvents
  > = {
    id: 'addMemoryPageMachine',
    initial: 'loading',
    context: {
      kids: undefined,
      memory: {
        title: '',
        summary: '',
        recordedDate: new Date(),
        tags: undefined,
      },
    },
    states: {
      loading: {
        invoke: {
          src: () => getKids(),
          onDone: {
            target: 'editing',
            actions: 'setDataToCtx',
          },
          onError: {
            target: 'error',
            actions: 'setErrorToCtx',
          },
        },
      },
      editing: {
        on: {
          SUBMIT: {
            target: 'submitting',
          },
        },
      },
      error: {
        on: {
          RETRY: 'loading',
        },
      },
      success: {
        after: {
          250: 'editing', // Near immediate transition - this is used to trigger a form reset
        },
      },
      submitting: {
        invoke: {
          // TODO: Boo any :(
          src: (_ctx: AddMemoryPageMachineContext, event: any) => {
            return createMemory(event.memory)
          },
          onDone: {
            actions: 'handleSuccess',
            target: 'success',
          },
          onError: {
            actions: 'handleError',
            target: 'editing',
          },
        },
      },
    },
  }

  const machineOptions = {
    actions: {
      setDataToCtx: assign((_ctx, event: any) => {
        return { kids: event.data }
      }),
      setErrorToCtx: assign((_ctx, event: any) => {
        return { error: event }
      }),
      handleError: () => {
        return showToast({ message: 'Memory creation failed. Try again.', variant: 'error' })
      },
      handleSuccess: (_ctx: any, event: any) => {
        return showToast({ message: 'Memory added', variant: 'success' })
      },
    },
  }

  return createMachine(machineConfig, machineOptions)
}

export { addMemoryPageMachine }
