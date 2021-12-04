import { Text as ChakraText } from '@chakra-ui/react'
import type { TextProps as ChakraTextProps } from '@chakra-ui/react'

type TextProps = ChakraTextProps

export function Text(props: TextProps) {
  return <ChakraText {...props} />
}
