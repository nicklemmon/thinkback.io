import { Button as ChakraButton, forwardRef } from '@chakra-ui/react'
import { ButtonProps as ChakraButtonProps } from '@chakra-ui/button'

type ButtonLevel =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'destructive-primary'
  | 'destructive-secondary'

// TODO: Ideally these would be types derived from Chakra somehow
type LevelConfig = {
  colorScheme: string
  variant: string
}

const LEVEL_PROPS: Record<ButtonLevel, LevelConfig> = {
  primary: {
    colorScheme: 'purple',
    variant: 'solid',
  },
  secondary: {
    colorScheme: 'purple',
    variant: 'outline',
  },
  tertiary: {
    colorScheme: 'purple',
    variant: 'ghost',
  },
  'destructive-primary': {
    colorScheme: 'red',
    variant: 'solid',
  },
  'destructive-secondary': {
    colorScheme: 'red',
    variant: 'outline',
  },
}

type ButtonProps = ChakraButtonProps & {
  level?: ButtonLevel
}

/** @see {@link https://chakra-ui.com/guides/as-prop#option-1-using-forwardref-from-chakra-uireact} */
export const Button = forwardRef<ButtonProps, typeof ChakraButton>(
  ({ level = 'primary', ...props }: ButtonProps, ref) => {
    return (
      <ChakraButton type="button" ref={ref} textDecor="none" {...LEVEL_PROPS[level]} {...props} />
    )
  },
)
