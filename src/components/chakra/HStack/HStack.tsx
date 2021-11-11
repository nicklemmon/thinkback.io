import { HStack as ChakraHStack } from '@chakra-ui/react'
import { StackProps as ChakraHStackProps } from '@chakra-ui/layout'

type HStackProps = ChakraHStackProps

export function HStack(props: HStackProps) {
  return <ChakraHStack {...props} />
}
