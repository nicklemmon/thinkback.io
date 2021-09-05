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
      on: {
        NAME_CHANGE: {
          actions: 'setNameToCtx',
          target: 'editing',
        },
        SUBMIT: {
          target: 'loading',
        },
      },
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
    success: {},
    error: {},
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
  },
}

const addKidPageMachine = createMachine(addKidPageMachineConfig, addKidPageMachineOptions)

export { addKidPageMachine }
