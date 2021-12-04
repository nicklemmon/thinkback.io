import { Box, BoxProps } from 'src/components/chakra'

type CardProps = {
  children: React.ReactNode
} & BoxProps

export function Card({ children, ...props }: CardProps) {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="xl" bg="white" {...props}>
      {children}
    </Box>
  )
}
