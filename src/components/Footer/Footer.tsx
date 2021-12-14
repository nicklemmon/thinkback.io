import React from 'react'
import { Box } from 'src/components/chakra'
import type { BoxProps } from 'src/components/chakra'
import { Container } from 'src/components'

type FooterProps = BoxProps & {
  children: React.ReactNode
}

export function Footer({ children, ...props }: FooterProps) {
  return (
    <Box
      position="sticky"
      top="100%"
      as="footer"
      backgroundColor="gray.200"
      color="gray.600"
      {...props}
    >
      <Container>{children}</Container>
    </Box>
  )
}
