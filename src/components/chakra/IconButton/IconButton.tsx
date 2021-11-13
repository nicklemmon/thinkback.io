import { IconButton as ChakraIconButton } from '@chakra-ui/button'
import { IconButtonProps as ChakraIconButtonProps } from '@chakra-ui/button'

type IconButtonProps = ChakraIconButtonProps

export function IconButton(props: IconButtonProps) {
  return <ChakraIconButton {...props} />
}
