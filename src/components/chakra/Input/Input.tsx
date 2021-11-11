import { Input as ChakraInput } from '@chakra-ui/react'
import { InputProps as ChakraInputProps } from '@chakra-ui/input'

type InputProps = ChakraInputProps

export function Input(props: InputProps) {
  return <ChakraInput {...props} />
}
