import { useEffect } from 'react'
import { Toast as ToastType } from 'src/types'
import { useToast } from 'src/hooks'

export function Toast({ message, variant }: ToastType) {
  const { showToast } = useToast()

  // On mount, add a toast to the queue
  useEffect(() => {
    showToast({ message, variant })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Render nothing - this is essentially a component that allows xstate/UI rendering to control the timing/state when toasts are rendered to the DOM
  return <></>
}
