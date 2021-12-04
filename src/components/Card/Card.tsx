import { Box, BoxProps } from 'src/components/chakra'

type CardComponentProps = {
  children: React.ReactNode
} & BoxProps

function Card({ children, ...props }: CardComponentProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" boxShadow="xl" bg="white" width="100%" {...props}>
      {children}
    </Box>
  )
}

function Content({ children, ...props }: CardComponentProps) {
  return (
    <Box p={4} {...props}>
      {children}
    </Box>
  )
}

function Header({ children, ...props }: CardComponentProps) {
  return (
    <Box p={4} pb={0} {...props}>
      {children}
    </Box>
  )
}

function Footer({ children, ...props }: CardComponentProps) {
  return (
    <Box p={4} pt={0} {...props}>
      {children}
    </Box>
  )
}

Card.Content = Content
Card.Header = Header
Card.Footer = Footer

export { Card }
