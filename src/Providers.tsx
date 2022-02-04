import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { ErrorBoundary } from 'src/components'
import { theme } from './theme'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </ChakraProvider>
    </BrowserRouter>
  )
}
