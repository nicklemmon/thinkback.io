import { Button as ChakraButton, forwardRef } from '@chakra-ui/react'
import { ButtonProps as ChakraButtonProps } from '@chakra-ui/button'

type ButtonProps = ChakraButtonProps

/** @see {@link https://chakra-ui.com/guides/as-prop#option-1-using-forwardref-from-chakra-uireact} */
export const Button = forwardRef<ButtonProps, typeof ChakraButton>((props: ButtonProps, ref) => {
  return <ChakraButton type="button" ref={ref} {...props} />
})
