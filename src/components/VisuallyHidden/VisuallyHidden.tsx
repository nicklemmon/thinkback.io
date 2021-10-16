import React from 'react'
import { VisuallyHidden as ChakraVisuallyHidden } from '@chakra-ui/react'

type VisuallyHiddenProps = {
  children: React.ReactNode
}

export function VisuallyHidden(props: VisuallyHiddenProps) {
  return <ChakraVisuallyHidden {...props} />
}
