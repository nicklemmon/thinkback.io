import React from 'react'
import { Box, Text, Link } from 'src/components/chakra'
import { Container } from 'src/components'

export function Footer() {
  return (
    <Box position="sticky" top="100%" as="footer" backgroundColor="gray.100" color="gray.600">
      <Container>
        <Text as="p">
          All rights reserved, {/* @ts-expect-error */}
          <Link
            as="a"
            href="https://nicklemmon.com"
            rel="noopener noreferrer"
            target="_blank"
            color="currentColor"
          >
            Nick Lemmon
          </Link>{' '}
          {new Date().getFullYear()}
        </Text>
      </Container>
    </Box>
  )
}
