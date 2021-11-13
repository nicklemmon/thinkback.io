import { Textarea as ChakraTextarea } from '@chakra-ui/react'
import { TextareaProps as ChakraTextareaProps } from '@chakra-ui/textarea'

type TextareaProps = ChakraTextareaProps

export function Textarea(props: TextareaProps) {
  return <ChakraTextarea {...props} />
}
