import { NavLink } from 'react-router-dom'
import { Box, Link, HStack } from 'src/components/chakra'
import { Container } from 'src/components'

type HeaderProps = {
  children: React.ReactNode
}

function Header({ children }: HeaderProps) {
  return (
    <Box as="header" borderBottom="1px solid" borderColor="purple.100">
      <Container display="flex" alignItems="center" justifyContent="space-between">
        {children}
      </Container>
    </Box>
  )
}

function Nav({ children }: HeaderProps) {
  return (
    <Box as="nav">
      <HStack>{children}</HStack>
    </Box>
  )
}

function HeaderLink({ children, to }: { children: React.ReactNode; to: string }) {
  return (
    <Link as={NavLink} to={to} textDecor="none" color="purple.500">
      {children}
    </Link>
  )
}

Header.Nav = Nav
Header.Link = HeaderLink

export { Header }
