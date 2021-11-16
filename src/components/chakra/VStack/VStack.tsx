import { VStack as ChakraVStack } from '@chakra-ui/react'
import { StackProps as ChakraVStackProps } from '@chakra-ui/layout'

type VStackProps = ChakraVStackProps

export function VStack(props: VStackProps) {
  return <ChakraVStack spacing={4} align="flex-start" {...props} />
}
