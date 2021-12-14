import React from 'react'
import { Box } from 'src/components/chakra'
import type { BoxProps } from 'src/components/chakra'

type ContainerProps = BoxProps & {
  children: React.ReactNode
}

export function Container(props: ContainerProps) {
  return (
    <Box
      maxWidth="6xl"
      width="100%"
      marginX="auto"
      paddingX={['6', '6', '12']}
      paddingY="2"
      {...props}
    />
  )
}
