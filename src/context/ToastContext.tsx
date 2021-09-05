import React from 'react'
import { useMachine } from '@xstate/react'
import { toastMachine } from 'src/machines'
import { State, SingleOrArray, Event, SCXML, EventData } from 'xstate'
import { ToastMachineEvents, ToastMachineContext } from 'src/machines/toastMachine/types'

// TODO: These types are derived from `useMachine` - is there a way to do this automatically?
type ToastContextParams =
  | undefined
  | [
      State<
        ToastMachineContext,
        ToastMachineEvents,
        any,
        {
          value: any
          context: ToastMachineContext
        }
      >,
      (
        event: SingleOrArray<Event<ToastMachineEvents>> | SCXML.Event<ToastMachineEvents>,
        payload?: EventData | undefined,
      ) => void,
    ]

const ToastContext = React.createContext<ToastContextParams>(undefined)

type ToastProviderProps = {
  children: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [state, send] = useMachine(toastMachine)

  return <ToastContext.Provider value={[state, send]}>{children}</ToastContext.Provider>
}
