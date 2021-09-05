import { Toast } from 'src/types'

export type ToastMachineContext = {
  toasts: Toast[] | []
}

export type ShowToastEvent = Toast & { type: 'ADD_TO_QUEUE' }

export type ClearToastEvent = { type: 'CLEAR_FROM_QUEUE'; id: string }

export type ToastMachineEvents =
  | { type: 'ADD_TO_QUEUE'; message: string; variant: 'success' | 'error' }
  | { type: 'CLEAR_FROM_QUEUE'; id: string }
  | { type: 'CLEAR_ALL' }
