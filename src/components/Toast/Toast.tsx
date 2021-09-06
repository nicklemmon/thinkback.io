import { useEffect } from 'react'
import { Toast as ToastType } from 'src/types'
import { useToasts } from 'src/hooks'

export function ToastList() {
  const [state] = useToasts()
  const { toasts } = state.context

  return (
    <div>
      {toasts.map((toast: ToastType) => {
        return (
          <div key={toast.id} role="alert">
            {toast.message}
          </div>
        )
      })}
    </div>
  )
}

export function Toast({ message, variant }: ToastType) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_state, send] = useToasts()

  // On mount, add a toast to the queue
  useEffect(() => {
    return send({ type: 'ADD_TO_QUEUE', message, variant })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Render nothing - this is essentially a component that allows xstate/UI rendering to control the timing/state when toasts are rendered to the DOM
  return <></>
}
