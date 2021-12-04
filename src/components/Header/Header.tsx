import { Box, Link, HStack } from 'src/components/chakra'
import { NavLink } from 'react-router-dom'

type HeaderProps = {
  children: React.ReactNode
}

function Header({ children }: HeaderProps) {
  return (
    <Box as="header" display="flex" borderBottom="1px solid" borderColor="purple.100">
      <Box
        display="flex"
        justifyContent="space-between"
        maxWidth="6xl"
        width="100%"
        marginX="auto"
        paddingX="12"
        paddingY="2"
      >
        {children}
      </Box>
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
