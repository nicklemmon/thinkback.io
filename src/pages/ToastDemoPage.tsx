import { useMachine } from '@xstate/react'
import { Page } from 'src/components'
import { toastMachine } from 'src/machines'
import { Toast } from 'src/types'

export function ToastDemoPage() {
  const [state, send] = useMachine(toastMachine)
  const { toasts } = state.context

  return (
    <Page>
      <Page.Title>Toast Demo</Page.Title>

      <p>{state.value}</p>

      <button
        onClick={() => send({ type: 'ADD_TO_QUEUE', message: 'This is a toast', variant: 'error' })}
      >
        Add Toast
      </button>

      <ul>
        {toasts.map((toast: Toast, index: number) => {
          return (
            <li key={toast.id}>
              {toast.message} - {toast.variant}
            </li>
          )
        })}
      </ul>
    </Page>
  )
}
