import { NavLink } from 'react-router-dom'
import { Box, Link, HStack, LinkProps } from 'src/components/chakra'
import { Container } from 'src/components'

type HeaderProps = {
  children: React.ReactNode
}

function Header({ children }: HeaderProps) {
  return (
    <Box
      as="header"
      borderBottom="1px solid"
      borderColor="purple.100"
      backgroundColor="gray.700"
      color="gray.200"
    >
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

function HeaderLink({
  children,
  to,
  ...props
}: { children: React.ReactNode; to: string } & LinkProps) {
  return (
    <Link as={NavLink} to={to} textDecor="none" color="gray.300" {...props}>
      {children}
    </Link>
  )
}

Header.Nav = Nav
Header.Link = HeaderLink

export { Header }
