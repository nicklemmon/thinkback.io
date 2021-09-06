import { createMachine, assign, MachineConfig } from 'xstate'
import { Kid } from 'src/types'
import { createKid } from 'src/helpers/api'

type AddKidPageMachineContext = {
  kid: Kid
}

type AddKidPageMachineSchema = {
  states: {
    editing: {}
    loading: {}
    success: {}
    error: {}
  }
}

type AddKidPageMachineEvents = { type: 'NAME_CHANGE'; name: string } | { type: 'SUBMIT' }

const sharedEventTransitions = {
  NAME_CHANGE: {
    actions: 'setNameToCtx',
    target: 'editing',
  },
  SUBMIT: {
    target: 'loading',
  },
}

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
          target: 'success',
        },
        onError: {
          target: 'error',
        },
      },
    },
    success: {
      entry: ['resetForm'],
      on: sharedEventTransitions,
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
  },
}

const addKidPageMachine = createMachine(addKidPageMachineConfig, addKidPageMachineOptions)

export { addKidPageMachine }
