import { NavLink } from 'react-router-dom'
import type { LinkProps } from 'src/components/chakra'
import { Box, Button, Link, HStack, List, ListItem } from 'src/components/chakra'
import { Container } from 'src/components'

type HeaderProps = {
  authenticated: boolean
  onLogOut?: () => void
}

function Header({ authenticated, onLogOut }: HeaderProps) {
  return (
    <Box as="header" backgroundColor="gray.700" color="gray.200">
      <Container display="flex" alignItems="center" justifyContent="space-between">
        <Link
          fontWeight="700"
          textDecor="none"
          color="gray.100"
          to={authenticated ? '/memories' : '/auth'}
        >
          ThinkBack
        </Link>

        {authenticated ? (
          <Box as="nav">
            <HStack as={List}>
              <ListItem>
                <HeaderLink to="/memories">Memories</HeaderLink>
              </ListItem>
              <ListItem>
                <HeaderLink to="/kids">Kids</HeaderLink>
              </ListItem>
              <ListItem>
                <HeaderLink to="/profile">Profile</HeaderLink>
              </ListItem>

              {onLogOut ? (
                <ListItem>
                  <Button
                    level="secondary"
                    size="sm"
                    colorScheme="whiteAlpha"
                    color="white"
                    onClick={onLogOut}
                  >
                    Log Out
                  </Button>
                </ListItem>
              ) : null}
            </HStack>
          </Box>
        ) : null}
      </Container>
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

export { Header }
