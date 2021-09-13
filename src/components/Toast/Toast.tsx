import { useEffect } from 'react'
import { Toast as ToastType } from 'src/types'
import { useToasts, useToast } from 'src/hooks'

export function ToastList() {
  const [state, send] = useToasts()
  const { toasts } = state.context

  return (
    <div>
      {toasts.map((toast: ToastType) => {
        return (
          <div key={toast.id}>
            <div role="alert">{toast.message}</div>

            {/* @ts-ignore - TODO: xstate event type problem - not sure why this is happening as they aren't mutually exclusive events */}
            <button onClick={() => send({ type: 'CLEAR_FROM_QUEUE', id: toast.id })}>Clear</button>
          </div>
        )
      })}
    </div>
  )
}

export function Toast({ message, variant }: ToastType) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { showToast } = useToast()

  // On mount, add a toast to the queue
  useEffect(() => {
    return showToast({ message, variant })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Render nothing - this is essentially a component that allows xstate/UI rendering to control the timing/state when toasts are rendered to the DOM
  return <></>
}
