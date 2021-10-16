import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastProvider } from './context'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <ToastProvider>{children}</ToastProvider>
      </ChakraProvider>
    </BrowserRouter>
  )
}
