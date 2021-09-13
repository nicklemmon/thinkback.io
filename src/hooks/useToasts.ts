import { useContext, useCallback } from 'react'
import { ToastContext } from 'src/context'
import { Toast as ToastType } from 'src/types'

export function useToasts() {
  const context = useContext(ToastContext)

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

export function useToast() {
  // eslint-disable-next-line
  const [_state, send] = useToasts()

  const showToast = useCallback(
    ({ message, variant }: ToastType) => {
      return send({ type: 'ADD_TO_QUEUE', message, variant })
    },
    [send],
  )

  return { showToast }
}
