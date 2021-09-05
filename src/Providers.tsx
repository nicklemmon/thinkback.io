import { ReactNode } from 'react'
import { ToastProvider } from './context'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return <ToastProvider>{children}</ToastProvider>
}
