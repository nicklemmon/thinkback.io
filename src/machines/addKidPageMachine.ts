import { createMachine, MachineConfig } from 'xstate'
import { Kid, Toast } from 'src/types'
import { createKid } from 'src/helpers/api'

type AddKidPageMachineContext = {}

type AddKidPageMachineSchema = {
  states: {
    editing: {}
    submitting: {}
    success: {}
  }
}

type AddKidPageMachineEvents = { type: 'SUBMIT'; kid: Kid }

function addKidPageMachine(showToast: (toast: Toast) => void) {
  const addKidPageMachineConfig: MachineConfig<
    AddKidPageMachineContext,
    AddKidPageMachineSchema,
    AddKidPageMachineEvents
  > = {
    id: 'addKidPageMachine',
    initial: 'editing',
    context: {},
    states: {
      editing: {
        on: {
          SUBMIT: 'submitting',
        },
      },
      submitting: {
        invoke: {
          src: (_ctx: AddKidPageMachineContext, event: any) => {
            return createKid(event.kid)
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
      success: {
        after: {
          250: 'editing', // Near immediate transition - this is used to trigger a form reset
        },
      },
    },
  }

  const addKidPageMachineOptions = {
    actions: {
      handleError: () => {
        return showToast({ message: 'Kid was not created. Try again', variant: 'error' })
      },
      handleSuccess: () => {
        return showToast({ message: 'Kid added', variant: 'success' })
      },
    },
  }

  return createMachine(addKidPageMachineConfig, addKidPageMachineOptions)
}

export { addKidPageMachine }
