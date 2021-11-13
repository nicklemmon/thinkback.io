import { Button as ChakraButton } from '@chakra-ui/react'
import { ButtonProps as ChakraButtonProps } from '@chakra-ui/button'

type ButtonProps = ChakraButtonProps

export function Button(props: ButtonProps) {
  return <ChakraButton type="button" {...props} />
}
