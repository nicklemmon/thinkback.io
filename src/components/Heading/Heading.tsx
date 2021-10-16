import { Heading as ChakraHeading } from '@chakra-ui/react'
import { HeadingProps as ChakraHeadingProps } from '@chakra-ui/layout'

type HeadingProps = ChakraHeadingProps

export function Heading(props: HeadingProps) {
  return <ChakraHeading {...props} />
}
