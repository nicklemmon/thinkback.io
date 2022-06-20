import { Box } from 'src/components/chakra'
import { Header, Footer } from 'src/components'

type DefaultLayoutProps = {
  children: React.ReactNode
  authenticated: boolean
  onLogOut?: () => void
}

export function DefaultLayout({ children, authenticated, onLogOut }: DefaultLayoutProps) {
  return (
    <Box minHeight="100vh">
      <Header authenticated={authenticated} onLogOut={onLogOut} />

      <main>{children}</main>

      <Footer />
    </Box>
  )
}
