import { createMachine, MachineConfig } from 'xstate'
import { NewMemory, Toast } from 'src/types'
import { createMemory } from 'src/helpers/api'

type AddMemoryPageMachineContext = {
  memory: NewMemory
}

type AddMemoryPageMachineSchema = {
  states: {
    editing: {}
    loading: {}
  }
}

type AddKidPageMachineEvents = { type: 'SUBMIT'; memory: NewMemory }

function addMemoryPageMachine(showToast: (toast: Toast) => void) {
  const machineConfig: MachineConfig<
    AddMemoryPageMachineContext,
    AddMemoryPageMachineSchema,
    AddKidPageMachineEvents
  > = {
    id: 'addMemoryPageMachine',
    initial: 'editing',
    context: {
      memory: {
        title: '',
        summary: '',
        recordedDate: new Date(),
        tags: undefined,
      },
    },
    states: {
      editing: {
        on: {
          SUBMIT: {
            target: 'loading',
          },
        },
      },
      loading: {
        invoke: {
          // TODO: Boo any :(
          src: (_ctx: AddMemoryPageMachineContext, event: any) => createMemory(event.memory),
          onDone: {
            actions: 'handleSuccess',
            target: 'editing',
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
      handleError: () => {
        return showToast({ message: 'Memory creation failed. Try again.', variant: 'error' })
      },
      handleSuccess: () => {
        return showToast({ message: 'Memory added', variant: 'success' })
      },
    },
  }

  return createMachine(machineConfig, machineOptions)
}

export { addMemoryPageMachine }
