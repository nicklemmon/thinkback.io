import { FormLabel as ChakraFormLabel } from '@chakra-ui/react'
import { FormLabelProps as ChakraFormLabelProps } from '@chakra-ui/form-control'

type FormLabelProps = ChakraFormLabelProps

export function FormLabel(props: FormLabelProps) {
  return <ChakraFormLabel {...props} />
}
