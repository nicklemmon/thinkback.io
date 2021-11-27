import { Spinner as ChakraSpinner } from '@chakra-ui/react'
import { SpinnerProps as ChakraSpinnerProps } from '@chakra-ui/spinner'

type SpinnerProps = ChakraSpinnerProps

export function Spinner(props: SpinnerProps) {
  return <ChakraSpinner color="purple.700" size="lg" {...props} />
}
