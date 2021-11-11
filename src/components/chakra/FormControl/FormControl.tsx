import { FormControl as ChakraFormControl } from '@chakra-ui/react'
import { FormControlProps as ChakraFormControlProps } from '@chakra-ui/form-control'

type FormControlProps = ChakraFormControlProps

export function FormControl(props: FormControlProps) {
  return <ChakraFormControl {...props} />
}
