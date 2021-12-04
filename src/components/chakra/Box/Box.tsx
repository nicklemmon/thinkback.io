import { Box as ChakraBox } from '@chakra-ui/react'
import { BoxProps as ChakraBoxProps } from '@chakra-ui/layout'

export type BoxProps = ChakraBoxProps

export function Box(props: BoxProps) {
  return <ChakraBox {...props} />
}
