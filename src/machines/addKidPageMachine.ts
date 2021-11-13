import { createMachine, assign, MachineConfig } from 'xstate'
import { Kid, Toast } from 'src/types'
import { createKid } from 'src/helpers/api'

type AddKidPageMachineContext = {
  kid: Kid
}

type AddKidPageMachineSchema = {
  states: {
    editing: {}
    loading: {}
    error: {}
  }
}

type AddKidPageMachineEvents = { type: 'NAME_CHANGE'; name: string } | { type: 'SUBMIT' }

const sharedEventTransitions = {
  NAME_CHANGE: {
    actions: 'setNameToCtx',
    target: 'editing',
  },
  SUBMIT: [
    {
      target: 'loading',
      cond: 'nameExists',
    },
    {
      target: 'error',
    },
  ],
}

function addKidPageMachine(showToast: (toast: Toast) => void) {
  const addKidPageMachineConfig: MachineConfig<
    AddKidPageMachineContext,
    AddKidPageMachineSchema,
    AddKidPageMachineEvents
  > = {
    id: 'addKidPageMachine',
    initial: 'editing',
    context: {
      kid: {
        name: '',
      },
    },
    states: {
      editing: {
        on: sharedEventTransitions,
      },
      loading: {
        invoke: {
          src: (ctx: AddKidPageMachineContext) => createKid(ctx.kid),
          onDone: {
            actions: ['handleSuccess', 'resetForm'],
            target: 'editing',
          },
          onError: {
            actions: 'handleError',
            target: 'editing',
          },
        },
      },
      error: {
        on: sharedEventTransitions,
      },
    },
  }

  const addKidPageMachineOptions = {
    actions: {
      setNameToCtx: assign((ctx: AddKidPageMachineContext, event: any) => {
        return {
          kid: {
            ...ctx.kid,
            name: event.name,
          },
        }
      }),
      resetForm: assign((ctx: AddKidPageMachineContext, event: any) => {
        return {
          kid: {
            name: '',
          },
        }
      }),
      handleError: () => {
        return showToast({ message: 'Kid was not created. Try again', variant: 'error' })
      },
      handleSuccess: () => {
        return showToast({ message: 'Kid added', variant: 'success' })
      },
    },
    guards: {
      nameExists: (ctx: AddKidPageMachineContext) => {
        return Boolean(ctx.kid.name)
      },
    },
  }

  return createMachine(addKidPageMachineConfig, addKidPageMachineOptions)
}

export { addKidPageMachine }
