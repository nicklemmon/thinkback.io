import { Container as ChakraContainer } from '@chakra-ui/react'
import { ContainerProps as ChakraContainerProps } from '@chakra-ui/layout'

type ContainerProps = ChakraContainerProps

export function Container(props: ContainerProps) {
  return <ChakraContainer {...props} />
}
