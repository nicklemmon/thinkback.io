import { Box as ChakraBox } from '@chakra-ui/react'
import { BoxProps as ChakraBoxProps } from '@chakra-ui/layout'

type BoxProps = ChakraBoxProps

export function Box(props: BoxProps) {
  return <ChakraBox {...props} />
}
