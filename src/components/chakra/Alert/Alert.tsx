import {
  Alert as ChakraAlert,
  AlertIcon as ChakraAlertIcon,
  AlertTitle as ChakraAlertTitle,
  AlertDescription as ChakraAlertDescription,
} from '@chakra-ui/react'
import {
  AlertProps as ChakraAlertProps,
  AlertIconProps as ChakraAlertIconProps,
  AlertTitleProps as ChakraAlertTitleProps,
  AlertDescriptionProps as ChakraAlertDescriptionProps,
} from '@chakra-ui/alert'

type AlertProps = ChakraAlertProps

type AlertIconProps = ChakraAlertIconProps

type AlertTitleProps = ChakraAlertTitleProps

type AlertDescriptionProps = ChakraAlertDescriptionProps

export function Alert(props: AlertProps) {
  return <ChakraAlert {...props} />
}

export function AlertIcon(props: AlertIconProps) {
  return <ChakraAlertIcon {...props} />
}

export function AlertTitle(props: AlertTitleProps) {
  return <ChakraAlertTitle {...props} />
}

export function AlertDescription(props: AlertDescriptionProps) {
  return <ChakraAlertDescription {...props} />
}
