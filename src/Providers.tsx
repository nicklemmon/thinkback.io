import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </BrowserRouter>
  )
}
