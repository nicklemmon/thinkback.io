import { Link as RouterLink } from 'react-router-dom'
import { LinkProps as ReactRouterLinkProps } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { LinkProps as ChakraLinkProps } from '@chakra-ui/layout'

type LinkProps = ReactRouterLinkProps & ChakraLinkProps

export function Link(props: LinkProps) {
  return <ChakraLink as={RouterLink} color="purple.600" textDecor="underline" {...props} />
}
