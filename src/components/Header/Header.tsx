import { Box, HStack } from 'src/components/chakra'

type HeaderProps = {
  children: React.ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <Box as="header" display="flex" borderBottom="1px solid" borderColor="purple.100">
      <HStack maxW="6xl" width="100%" marginX="auto" paddingX="12" paddingY="2">
        {children}
      </HStack>
    </Box>
  )
}

export function HeaderNav({ children }: HeaderProps) {
  return (
    <Box as="nav">
      <HStack>{children}</HStack>
    </Box>
  )
}
