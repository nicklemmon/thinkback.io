import { Box } from 'src/components/chakra'
import { Header, Footer } from 'src/components'

type DefaultLayoutProps = {
  children: React.ReactNode
  isAuthorized: boolean
  onLogOut?: () => void
}

export function DefaultLayout({ children, isAuthorized, onLogOut }: DefaultLayoutProps) {
  return (
    <Box minHeight="100vh">
      <Header isAuthorized={isAuthorized} onLogOut={onLogOut} />

      <main>{children}</main>

      <Footer />
    </Box>
  )
}
