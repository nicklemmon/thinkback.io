import { Box } from 'src/components/chakra'

type HeaderProps = {
  children: React.ReactNode
}

export function Header({ children }: HeaderProps) {
  return <Box as="header">{children}</Box>
}
