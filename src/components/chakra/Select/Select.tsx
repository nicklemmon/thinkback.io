import { Select as ChakraSelect } from '@chakra-ui/react'
import { SelectProps as ChakraSelectProps } from '@chakra-ui/select'

type SelectProps = ChakraSelectProps

export function Select(props: SelectProps) {
  return <ChakraSelect {...props} />
}
